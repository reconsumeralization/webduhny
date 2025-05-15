import { Table } from "@webiny/db-dynamodb/toolbox";
import { Client } from "@elastic/elasticsearch";
import { inject, makeInjectable } from "@webiny/ioc";
import { DataMigration, DataMigrationContext } from "@webiny/data-migration";
import {
    PrimaryDynamoTableSymbol,
    ElasticsearchDynamoTableSymbol,
    ElasticsearchClientSymbol
} from "@webiny/data-migration/symbols";
import {
    forEachTenantLocale,
    esGetIndexExist,
    batchWriteAll,
    esGetIndexName,
    getCompressedData
} from "~/utils";
import { createDdbEntryEntity, createDdbEsEntryEntity } from "../entities/createEntryEntity";
import { ACO_FOLDER_MODEL_ID, TASK_MODEL_ID } from "../constants";
import type { TaskEntryEventPayload } from "~/migrations/5.43.0/001/types";
import { generateAlphaNumericId, parseIdentifier, executeWithRetry } from "@webiny/utils";
import { StepFunctionService } from "@webiny/tasks/service/StepFunctionServicePlugin";

export class Flp_5_43_0_001 implements DataMigration {
    private readonly table: Table<string, string, string>;
    private readonly elasticsearchClient: Client;
    private readonly ddbEntryEntity: ReturnType<typeof createDdbEntryEntity>;
    private readonly ddbEsEntryEntity: ReturnType<typeof createDdbEsEntryEntity>;

    constructor(
        table: Table<string, string, string>,
        esTable: Table<string, string, string>,
        elasticsearchClient: Client
    ) {
        this.table = table;
        this.elasticsearchClient = elasticsearchClient;
        this.ddbEntryEntity = createDdbEntryEntity(table);
        this.ddbEsEntryEntity = createDdbEsEntryEntity(esTable);
    }

    getId() {
        return "5.43.0-001";
    }

    getDescription() {
        return "Introduce 'flp' entities";
    }

    async shouldExecute({ logger }: DataMigrationContext) {
        let shouldExecute = false;

        await forEachTenantLocale({
            table: this.table,
            logger,
            callback: async ({ tenantId, localeCode }) => {
                shouldExecute = true;

                const indexExists = await esGetIndexExist({
                    elasticsearchClient: this.elasticsearchClient,
                    tenant: tenantId,
                    locale: localeCode,
                    type: ACO_FOLDER_MODEL_ID,
                    isHeadlessCmsModel: true
                });

                if (!indexExists) {
                    logger.info(
                        `No Elasticsearch index found for folders in tenant "${tenantId}" and locale "${localeCode}"; skipping.`
                    );
                    shouldExecute = false;
                    return false;
                }

                // Continue to the next locale.
                return shouldExecute;
            }
        });

        return shouldExecute;
    }

    async execute({ logger }: DataMigrationContext) {
        await forEachTenantLocale({
            table: this.table,
            logger,
            callback: async ({ tenantId, localeCode }) => {
                logger.info(`Starting migration for tenant ${tenantId} / locale ${localeCode}`);

                const indexExists = await esGetIndexExist({
                    elasticsearchClient: this.elasticsearchClient,
                    tenant: tenantId,
                    locale: localeCode,
                    type: ACO_FOLDER_MODEL_ID,
                    isHeadlessCmsModel: true
                });

                if (!indexExists) {
                    logger.info(
                        `No Elasticsearch index found for folders in tenant "${tenantId}" and locale "${localeCode}"; skipping.`
                    );
                    return true;
                }

                const event: TaskEntryEventPayload = {
                    tenant: tenantId,
                    locale: localeCode,
                    id: `5_43_0_001_migration_${generateAlphaNumericId()}`,
                    definitionId: "acoSyncFlp",
                    name: "5_43_0_001_migration",
                    input: {
                        type: "*"
                    }
                };

                await this.storeTaskDdbEntry(event);

                const service = new StepFunctionService({
                    getTenant: () => tenantId,
                    getLocale: () => localeCode
                });

                const startTaskExecution = async () => {
                    const result = await service.send(
                        {
                            definitionId: event.definitionId,
                            id: event.id
                        },
                        0
                    );

                    if (!result) {
                        throw new Error(
                            `Failed to trigger task for tenant ${tenantId} / locale ${localeCode}. Check the above log.`
                        );
                    }

                    return result;
                };

                try {
                    await executeWithRetry(startTaskExecution, {
                        onFailedAttempt: async error => {
                            logger.error(
                                `Attempt #${error.attemptNumber} failed to trigger task for tenant ${tenantId} / locale ${localeCode}.`
                            );
                        }
                    });

                    logger.info(
                        `Successfully triggered task for tenant ${tenantId} / locale ${localeCode}. FLP records will be synced via background task.`
                    );
                } catch (e) {
                    logger.error(
                        `Failed to trigger task for tenant ${tenantId} / locale ${localeCode}. Check the above logs for more info.`,
                        e
                    );
                }

                return true;
            }
        });

        logger.info("Finished updating all FLP entities across all tenants and locales.");
    }

    private async storeTaskDdbEntry(event: TaskEntryEventPayload): Promise<void> {
        const { tenant, locale, id: entryId, definitionId, name, input } = event;

        try {
            const values = {
                "number@iterations": 0,
                "text@taskStatus": "pending",
                "text@definitionId": definitionId,
                "text@name": name,
                "object@input": input
            };

            const partitionKey = `T#${tenant}#L#${locale}#CMS#CME#${entryId}`;

            const ddbItems = [
                // Exact entry revision
                this.ddbEntryEntity.putBatch({
                    PK: partitionKey,
                    SK: "REV#0001",
                    id: this.createRevisionId(entryId),
                    entryId,
                    locale,
                    location: {
                        folderId: "root"
                    },
                    locked: false,
                    meta: {},
                    modelId: TASK_MODEL_ID,
                    status: "draft",
                    tenant,
                    TYPE: "cms.entry",
                    version: 1,
                    webinyVersion: process.env.WEBINY_VERSION,
                    modifiedOn: new Date().toISOString(),
                    revisionCreatedOn: new Date().toISOString(),
                    revisionModifiedOn: new Date().toISOString(),
                    revisionSavedOn: new Date().toISOString(),
                    savedOn: new Date().toISOString(),
                    createdOn: new Date().toISOString(),
                    values
                }),
                // Latest entry revision
                this.ddbEntryEntity.putBatch({
                    PK: partitionKey,
                    SK: "L",
                    id: this.createRevisionId(entryId),
                    entryId,
                    locale,
                    location: {
                        folderId: "root"
                    },
                    locked: false,
                    meta: {},
                    modelId: TASK_MODEL_ID,
                    status: "draft",
                    tenant,
                    TYPE: "cms.entry.l",
                    version: 1,
                    webinyVersion: process.env.WEBINY_VERSION,
                    modifiedOn: new Date().toISOString(),
                    revisionCreatedOn: new Date().toISOString(),
                    revisionModifiedOn: new Date().toISOString(),
                    revisionSavedOn: new Date().toISOString(),
                    savedOn: new Date().toISOString(),
                    createdOn: new Date().toISOString(),
                    values
                })
            ];

            const rawDatas = {
                modelId: TASK_MODEL_ID,
                revisionCreatedOn: new Date().toISOString(),
                revisionSavedOn: new Date().toString(),
                revisionModifiedOn: new Date().toString(),
                createdOn: new Date().toString(),
                modifiedOn: new Date().toString(),
                status: "draft",
                meta: {},
                entryId,
                id: this.createRevisionId(entryId),
                version: 1,
                location: { folderId: "root" },
                locale,
                values: {
                    "number@iterations": 0,
                    "text@taskStatus": "pending",
                    "text@definitionId": definitionId,
                    "text@name": name
                },
                tenant,
                locked: false,
                webinyVersion: process.env.WEBINY_VERSION,
                latest: true,
                TYPE: "cms.entry.l",
                __type: "cms.entry.l",
                rawValues: {
                    "object@input": input
                }
            };

            const ddbEsItems = [
                this.ddbEsEntryEntity.putBatch({
                    PK: partitionKey,
                    SK: "L",
                    data: await getCompressedData(rawDatas),
                    index: esGetIndexName({
                        tenant,
                        locale,
                        type: TASK_MODEL_ID,
                        isHeadlessCmsModel: true
                    })
                })
            ];

            await batchWriteAll({
                table: this.ddbEntryEntity.table,
                items: ddbItems
            });

            await batchWriteAll({
                table: this.ddbEsEntryEntity.table,
                items: ddbEsItems
            });
        } catch (e) {
            console.log("Error while storing task entry.", event);
            console.error(e);
        }
    }

    private createRevisionId(id: string) {
        const { id: entryId } = parseIdentifier(id);
        return `${entryId}#0001`;
    }
}

makeInjectable(Flp_5_43_0_001, [
    inject(PrimaryDynamoTableSymbol),
    inject(ElasticsearchDynamoTableSymbol),
    inject(ElasticsearchClientSymbol)
]);
