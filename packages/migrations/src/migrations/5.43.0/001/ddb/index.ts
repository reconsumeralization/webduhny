import { Table } from "@webiny/db-dynamodb/toolbox";
import { count } from "@webiny/db-dynamodb";
import { inject, makeInjectable } from "@webiny/ioc";
import { DataMigration, DataMigrationContext } from "@webiny/data-migration";
import { PrimaryDynamoTableSymbol } from "@webiny/data-migration/symbols";
import { StepFunctionService } from "@webiny/tasks/service/StepFunctionServicePlugin";
import { createDdbEntryEntity } from "../entities/createEntryEntity";
import { forEachTenantLocale, batchWriteAll } from "~/utils";
import { ACO_FOLDER_MODEL_ID, TASK_MODEL_ID } from "../constants";
import { generateAlphaNumericId, parseIdentifier, executeWithRetry } from "@webiny/utils";
import type { TaskEntryEventPayload } from "../types";

export class Flp_5_43_0_001 implements DataMigration {
    private readonly table: Table<string, string, string>;
    private readonly entryEntity: ReturnType<typeof createDdbEntryEntity>;

    constructor(table: Table<string, string, string>) {
        this.table = table;
        this.entryEntity = createDdbEntryEntity(table);
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

                // Let's find out if there are any folders stored in the system.
                const foldersCount = await count({
                    entity: this.entryEntity,
                    partitionKey: `T#${tenantId}#L#${localeCode}#CMS#CME#M#${ACO_FOLDER_MODEL_ID}#L`,
                    options: {
                        index: "GSI1"
                    }
                });

                if (foldersCount === 0) {
                    logger.info("No folders found: skipping migration!");
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
                // Let's find out if there are any folders stored for the current tenant / locale.
                const foldersCount = await count({
                    entity: this.entryEntity,
                    partitionKey: `T#${tenantId}#L#${localeCode}#CMS#CME#M#${ACO_FOLDER_MODEL_ID}#L`,
                    options: {
                        index: "GSI1"
                    }
                });

                if (foldersCount === 0) {
                    logger.info("No folders found: skipping migration!");
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
                    location: {
                        folderId: "root"
                    },
                    locked: false,
                    modelId: TASK_MODEL_ID,
                    status: "draft",
                    tenant,
                    TYPE: "cms.entry",
                    version: 1,
                    modifiedOn: new Date().toISOString(),
                    revisionCreatedOn: new Date().toISOString(),
                    revisionModifiedOn: new Date().toISOString(),
                    revisionSavedOn: new Date().toISOString(),
                    savedOn: new Date().toISOString(),
                    createdOn: new Date().toISOString(),
                    webinyVersion: process.env.WEBINY_VERSION,
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
                    location: {
                        folderId: "root"
                    },
                    locked: false,
                    meta: {},
                    modelId: TASK_MODEL_ID,
                    modifiedOn: new Date().toISOString(),
                    revisionCreatedOn: new Date().toISOString(),
                    revisionModifiedOn: new Date().toISOString(),
                    revisionSavedOn: new Date().toISOString(),
                    savedOn: new Date().toISOString(),
                    createdOn: new Date().toISOString(),
                    status: "draft",
                    tenant,
                    TYPE: "cms.entry.l",
                    version: 1,
                    webinyVersion: process.env.WEBINY_VERSION,
                    values
                })
            ];

            await batchWriteAll({
                items,
                table: this.entryEntity.table
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

makeInjectable(Flp_5_43_0_001, [inject(PrimaryDynamoTableSymbol)]);
