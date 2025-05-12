import { EventBridgeClient, PutEventsCommand } from "@webiny/aws-sdk/client-eventbridge";
import { ServiceDiscovery } from "@webiny/api";
import { Table } from "@webiny/db-dynamodb/toolbox";
import { generateAlphaNumericId, parseIdentifier } from "@webiny/utils";
import { batchWriteAll } from "./dynamoDb";
import { createLegacyEntity } from "./createEntity";

export interface TaskEntryEventPayload {
    tenant: string;
    locale: string;
    id: string;
    definitionId: string;
    name: string;
    input: Record<string, any>;
}

export interface SendTaskParams {
    tenantId: string;
    localeCode: string;
    definitionId: string;
    taskName: string;
    input: Record<string, any>;
}

const TASK_MODEL_ID = "webinyTask";

export class BackgroundTaskService {
    private readonly table: Table<string, string, string>;
    private readonly client: EventBridgeClient;
    private readonly entryEntity: ReturnType<typeof this.createEntryEntity>;

    constructor(table: Table<string, string, string>) {
        this.table = table;
        this.client = new EventBridgeClient({
            region: process.env.AWS_REGION
        });
        this.entryEntity = this.createEntryEntity();
    }

    async send({
        tenantId,
        localeCode,
        definitionId,
        taskName,
        input
    }: SendTaskParams): Promise<TaskEntryEventPayload> {
        const eventPayload = this.createEventPayload({
            tenantId,
            localeCode,
            definitionId,
            taskName,
            input
        });

        // Store the task to DynamoDb
        await this.storeTaskDdbEntry(eventPayload);

        // Send a new event to EventBridge
        await this.sendEventToEventBridge(eventPayload);

        return eventPayload;
    }

    private createEventPayload({
        tenantId,
        localeCode,
        definitionId,
        taskName,
        input
    }: SendTaskParams): TaskEntryEventPayload {
        return {
            tenant: tenantId,
            locale: localeCode,
            id: `${taskName}_${generateAlphaNumericId()}`,
            definitionId,
            name: taskName,
            input
        };
    }

    private async getEventBusName(): Promise<string> {
        const manifests = await ServiceDiscovery.load();
        if (!manifests) {
            throw new Error("Could not load manifests!");
        }
        return String(manifests.core.eventBus.name);
    }

    private async sendEventToEventBridge(eventPayload: TaskEntryEventPayload): Promise<void> {
        const eventBusName = await this.getEventBusName();
        const event = this.createEventBridgeEvent(eventPayload);

        const cmd = new PutEventsCommand({
            Entries: [
                {
                    Source: "webiny-api-tasks",
                    EventBusName: eventBusName,
                    DetailType: "WebinyBackgroundTask",
                    Detail: JSON.stringify(event)
                }
            ]
        });

        await this.client.send(cmd);
    }

    private createEventBridgeEvent(eventPayload: TaskEntryEventPayload) {
        return {
            webinyTaskId: eventPayload.id,
            webinyTaskDefinitionId: eventPayload.definitionId,
            tenant: eventPayload.tenant,
            locale: eventPayload.locale,
            delay: 0
        };
    }

    private async storeTaskDdbEntry(event: TaskEntryEventPayload): Promise<void> {
        const { tenant, locale, id: entryId, definitionId, name, input } = event;

        const values = {
            "number@iterations": 0,
            "text@taskStatus": "pending",
            "text@definitionId": definitionId,
            "text@name": name,
            "object@input": input
        };

        const partitionKey = `T#${tenant}#L#${locale}#CMS#CME#CME#${entryId}`;

        const items = [
            // Exact entry revision
            this.entryEntity.putBatch({
                PK: partitionKey,
                SK: "REV#0001",
                GSI1_PK: `T#${tenant}#L#${locale}#CMS#CME#M#${TASK_MODEL_ID}#A`,
                GSI1_SK: this.createRevisionId(entryId),
                id: this.createRevisionId(entryId),
                entryId,
                locale,
                locked: false,
                modelId: TASK_MODEL_ID,
                status: "draft",
                tenant,
                TYPE: "cms.entry",
                version: 1,
                createdOn: new Date().toISOString(),
                savedOn: new Date().toISOString(),
                values
            }),
            // Latest entry revision
            this.entryEntity.putBatch({
                PK: partitionKey,
                SK: "L",
                GSI1_PK: `T#${tenant}#L#${locale}#CMS#CME#M#${TASK_MODEL_ID}#L`,
                GSI1_SK: this.createRevisionId(entryId),
                id: this.createRevisionId(entryId),
                entryId,
                locale,
                locked: false,
                modelId: TASK_MODEL_ID,
                status: "draft",
                tenant,
                TYPE: "cms.entry.l",
                version: 1,
                createdOn: new Date().toISOString(),
                savedOn: new Date().toISOString(),
                values
            })
        ];

        await batchWriteAll({
            items,
            table: this.entryEntity.table
        });
    }

    private createRevisionId(id: string) {
        const { id: entryId } = parseIdentifier(id);
        return `${entryId}#0001`;
    }

    private createEntryEntity() {
        const ddbAttributes: Parameters<typeof createLegacyEntity>[2] = {
            PK: {
                type: "string",
                partitionKey: true
            },
            SK: {
                type: "string",
                sortKey: true
            },
            GSI1_PK: {
                type: "string"
            },
            GSI1_SK: {
                type: "string"
            },
            TYPE: {
                type: "string"
            },
            __type: {
                type: "string"
            },
            webinyVersion: {
                type: "string"
            },
            tenant: {
                type: "string"
            },
            entryId: {
                type: "string"
            },
            id: {
                type: "string"
            },
            createdBy: {
                type: "map"
            },
            ownedBy: {
                type: "map"
            },
            modifiedBy: {
                type: "map"
            },
            createdOn: {
                type: "string"
            },
            savedOn: {
                type: "string"
            },
            modelId: {
                type: "string"
            },
            locale: {
                type: "string"
            },
            publishedOn: {
                type: "string"
            },
            version: {
                type: "number"
            },
            locked: {
                type: "boolean"
            },
            status: {
                type: "string"
            },
            values: {
                type: "map"
            },
            meta: {
                type: "map"
            },
            location: {
                type: "map"
            }
        };

        return createLegacyEntity(this.table, "CmsEntries", ddbAttributes);
    }
}
