import { createStoreExecute } from "~/resolver/app/storer/StoreExecute.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createMockDeployment } from "~tests/mocks/deployments.js";
import { type IRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import { createMockTable } from "~tests/mocks/table.js";

describe("StoreExecute", () => {
    const tableName = process.env.DB_TABLE as string;

    const deployment = createMockDeployment({
        primaryDynamoDbName: process.env.DB_TABLE
    });

    let client: DynamoDBDocument;
    let table: IRecordsDataDeploymentTable;
    beforeEach(async () => {
        client = getDocumentClient();
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

    it("should execute and do nothing because of no items", async () => {
        const storeExecute = createStoreExecute({
            maxBatchSize: 10,
            retryDelay: 10,
            maxRetries: 1
        });

        table.add({
            command: "put",
            PK: "pk1",
            SK: "sk1"
        });

        const bundles = table.bundle();

        expect(bundles).toHaveLength(1);
        const bundle = bundles[0];

        const result = await storeExecute.execute({
            items: [],
            table: tableName,
            client,
            deployment,
            bundle
        });

        expect(result).toBeUndefined();
    });
});
