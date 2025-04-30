import { createFetcher } from "~/resolver/app/fetcher/Fetcher.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import {
    createRecordsDataDeploymentTable,
    type IRecordsDataDeploymentTable
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createMockTable } from "~tests/mocks/table.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import { createMockDeployment } from "~tests/mocks/deployments.js";
import { createRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";

describe("Fetcher", () => {
    let table: IRecordsDataDeploymentTable;

    const baseDeployment = createMockDeployment({
        primaryDynamoDbName: process.env.DB_TABLE
    });
    const deployment = createRecordsDataDeployment({
        deployment: baseDeployment,
        createRecordsDataDeploymentTable: params => {
            return createRecordsDataDeploymentTable({
                name: params.tableName,
                createRecordsDataDeploymentTableItem: item => {
                    return createRecordsDataDeploymentTableItem({
                        command: item.item.command,
                        PK: item.item.PK,
                        SK: item.item.SK
                    });
                }
            });
        }
    });
    beforeEach(async () => {
        table = createMockTable({
            name: process.env.DB_TABLE,
            createRecordsDataDeploymentTableItem: item => {
                return createRecordsDataDeploymentTableItem({
                    command: item.item.command,
                    PK: item.item.PK,
                    SK: item.item.SK
                });
            }
        });
    });

    it("should execute fetcher and return items", async () => {
        const fetcher = createFetcher({
            createDocumentClient: () => {
                return getDocumentClient();
            }
        });
        table.add({
            command: "put",
            PK: "pk1",
            SK: "sk1"
        });

        const bundles = table.bundle();
        expect(bundles).toHaveLength(1);

        const bundle = bundles[0];

        const result = await fetcher.exec({
            bundle,
            table,
            deployment,
            retryDelay: 10,
            maxRetries: 1,
            maxBatchSize: 25
        });

        expect(result).toEqual({
            items: []
        });
    });
});
