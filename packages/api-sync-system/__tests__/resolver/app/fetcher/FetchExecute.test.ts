import { createFetchExecute } from "~/resolver/app/fetcher/FetchExecute.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import type { IRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createMockTable } from "~tests/mocks/table.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";

describe("FetchExecute", () => {
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

    it("should have no items in fetcher execute result as we do not have anything in the database", async () => {
        const fetchExecute = createFetchExecute({
            maxBatchSize: 50,
            maxRetries: 10,
            retryDelay: 100
        });

        table.add({
            command: "put",
            PK: "pk1",
            SK: "sk1"
        });
        table.add({
            command: "delete",
            PK: "pk2",
            SK: "sk2"
        });

        const bundles = table.bundle();

        expect(bundles).toHaveLength(2);

        for (const bundle of bundles) {
            const result = await fetchExecute.execute({
                client,
                table,
                bundle
            });
            expect(result).toEqual([]);
        }
    });
});
