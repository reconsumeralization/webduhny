import { Table } from "@webiny/db-dynamodb/toolbox";
import { count } from "@webiny/db-dynamodb";
import { inject, makeInjectable } from "@webiny/ioc";
import { DataMigration, DataMigrationContext } from "@webiny/data-migration";
import { PrimaryDynamoTableSymbol } from "@webiny/data-migration/symbols";
import { createDdbEntryEntity } from "./entities/createEntryEntity";
import { forEachTenantLocale, BackgroundTaskService } from "~/utils";
import { ACO_FOLDER_MODEL_ID } from "~/migrations/5.43.0/001/constants";

export class Flp_5_43_0_001 implements DataMigration {
    private readonly table: Table<string, string, string>;
    private readonly entryEntity: ReturnType<typeof createDdbEntryEntity>;
    private bgTaskService: BackgroundTaskService;

    constructor(table: Table<string, string, string>) {
        this.table = table;
        this.entryEntity = createDdbEntryEntity(table);
        this.bgTaskService = new BackgroundTaskService(table);
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

                const { id } = await this.bgTaskService.send({
                    tenantId,
                    localeCode,
                    definitionId: "acoSyncFlp",
                    taskName: "5_43_0_001_sync_folder_flp",
                    input: {
                        type: "*"
                    }
                });

                logger.info(
                    `Successfully triggered task ${id} for tenant ${tenantId} / locale ${localeCode}. FLP records will be synced via background task.`
                );

                return true;
            }
        });

        logger.info("Finished updating all FLP entities across all tenants and locales.");
    }
}

makeInjectable(Flp_5_43_0_001, [inject(PrimaryDynamoTableSymbol)]);
