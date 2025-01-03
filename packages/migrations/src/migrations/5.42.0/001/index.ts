import omit from "lodash/omit";
import { Table } from "@webiny/db-dynamodb/toolbox";
import { inject, makeInjectable } from "@webiny/ioc";
import { executeWithRetry } from "@webiny/utils";
import type { PrimitiveValue } from "@webiny/api-elasticsearch/types";
import type { DbItem } from "@webiny/db-dynamodb/utils";
import {
    DataMigration,
    DataMigrationContext,
    PrimaryDynamoTableSymbol
} from "@webiny/data-migration";
import {
    batchWriteAll,
    BatchWriteItem,
    ddbQueryAllWithCallback,
    forEachTenantLocale,
    queryAll,
    queryOne
} from "~/utils";
import { createNewPageEntity, createOldPageEntity } from "./createPageEntity";
import type { PbPage } from "./types";

const isGroupMigrationCompleted = (
    status: PrimitiveValue[] | boolean | undefined
): status is boolean => {
    return typeof status === "boolean";
};

const pageShouldBeMigrated = (page: DbItem<PbPage> & { data?: PbPage }) => {
    /*
     * In case the migration is being executed multiple times, we must check if the record
     * already has a `data` envelope. If it does, we must check if the `savedOn` attribute in the
     * old record is newer than the one in the `data` envelope. This can happen if the user upgrades,
     * then downgrades, updates a page, then upgrades again.
     */
    const dataSavedOn = page.data?.savedOn;
    if (dataSavedOn) {
        return new Date(dataSavedOn).getTime() < new Date(page.savedOn).getTime();
    }

    return true;
};

// Latest pages: T#root#L#en-US#PB#L
// Published pages: T#root#L#en-US#PB#P
// Page revisions: T#root#L#en-US#PB#{pid}

export class Pages_5_42_0_001 implements DataMigration {
    private readonly oldPageEntity: ReturnType<typeof createOldPageEntity>;
    private readonly newPageEntity: ReturnType<typeof createNewPageEntity>;
    private readonly table: Table<string, string, string>;

    constructor(table: Table<string, string, string>) {
        this.table = table;
        this.oldPageEntity = createOldPageEntity(table);
        this.newPageEntity = createNewPageEntity(table);
    }

    getId() {
        return "5.42.0-001";
    }

    getDescription() {
        return "Move page attributes to 'data' envelope.";
    }

    async shouldExecute({ logger }: DataMigrationContext): Promise<boolean> {
        let shouldExecute = false;

        await forEachTenantLocale({
            table: this.table,
            logger,
            callback: async ({ tenantId, localeCode }) => {
                await ddbQueryAllWithCallback<PbPage>(
                    {
                        entity: this.oldPageEntity,
                        partitionKey: `T#${tenantId}#L#${localeCode}#PB#L`,
                        options: {
                            gt: " "
                        }
                    },
                    async oldPages => {
                        if (oldPages.some(pageShouldBeMigrated)) {
                            shouldExecute = true;
                            // Abort ddb querying.
                            return false;
                        }

                        // Continue.
                        return true;
                    }
                );

                if (shouldExecute) {
                    return false;
                }

                // Continue to the next locale.
                return true;
            }
        });

        return shouldExecute;
    }

    async execute({ logger, ...context }: DataMigrationContext): Promise<void> {
        const migrationStatus = context.checkpoint || {};

        let batch = 0;

        await forEachTenantLocale({
            table: this.table,
            logger,
            callback: async ({ tenantId, localeCode }) => {
                const groupId = `${tenantId}:${localeCode}`;
                const status = migrationStatus[groupId];

                if (isGroupMigrationCompleted(status)) {
                    return true;
                }

                // We start by listing all "latest" pages, then, as we process individual "latest" page,
                // we'll also query for an optional "published" page, and all the related revisions.
                await ddbQueryAllWithCallback<PbPage>(
                    {
                        entity: this.oldPageEntity,
                        partitionKey: `T#${tenantId}#L#${localeCode}#PB#L`,
                        options: {
                            gt: status || " "
                        }
                    },
                    async oldPages => {
                        batch++;

                        logger.info(
                            `Processing batch #${batch} in group ${groupId} (${oldPages.length} pages).`
                        );

                        // Items to write
                        const items: BatchWriteItem[] = [];
                        const pagesToProcess = oldPages.filter(pageShouldBeMigrated);

                        for (const oldPage of pagesToProcess) {
                            // Process the "latest" record.
                            items.push(this.processPage(oldPage));
                            // Optionally, process the "published" record.
                            const publishedRecord = await this.getPublishedRecord(
                                tenantId,
                                localeCode,
                                oldPage.pid
                            );

                            if (publishedRecord) {
                                items.push(this.processPage(publishedRecord));
                            }

                            // Process all page revisions.
                            const revisions = await this.getPageRevisions(
                                tenantId,
                                localeCode,
                                oldPage.pid
                            );

                            revisions.forEach(revision => {
                                items.push(this.processPage(revision));
                            });
                        }

                        const execute = () => {
                            return batchWriteAll({ table: this.newPageEntity.table, items });
                        };

                        await executeWithRetry(execute, {
                            onFailedAttempt: error => {
                                logger.error(
                                    `"batchWriteAll" attempt #${error.attemptNumber} failed.`
                                );
                                logger.error(error.message);
                            }
                        });

                        // Update checkpoint after every batch.
                        migrationStatus[groupId] = oldPages[oldPages.length - 1]?.id;

                        // Check if we should store checkpoint and exit.
                        if (context.runningOutOfTime()) {
                            await context.createCheckpointAndExit(migrationStatus);
                        } else {
                            await context.createCheckpoint(migrationStatus);
                        }
                    }
                );

                // Mark group as completed.
                migrationStatus[groupId] = true;

                // Store checkpoint.
                await context.createCheckpoint(migrationStatus);

                // Continue processing.
                return true;
            }
        });
    }

    private getPageAttributes(page: PbPage) {
        return omit(page, ["PK", "SK", "TYPE", "_ct", "_et", "_md"]);
    }

    private processPage(page: PbPage) {
        return this.newPageEntity.putBatch(
            {
                ...page,
                data: this.getPageAttributes(page)
            },
            { strictSchemaCheck: false }
        );
    }

    private async getPublishedRecord(tenant: string, locale: string, pid: string) {
        return await queryOne<PbPage>({
            entity: this.oldPageEntity,
            partitionKey: `T#${tenant}#L#${locale}#PB#P`,
            options: {
                eq: pid
            }
        });
    }

    private async getPageRevisions(tenant: string, locale: string, pid: string) {
        return await queryAll<PbPage>({
            entity: this.oldPageEntity,
            partitionKey: `T#${tenant}#L#${locale}#PB${pid}`,
            options: {
                gt: " "
            }
        });
    }
}

makeInjectable(Pages_5_42_0_001, [inject(PrimaryDynamoTableSymbol)]);
