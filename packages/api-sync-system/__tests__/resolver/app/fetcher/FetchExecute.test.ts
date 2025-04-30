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

    it("should fail to fetch because of an error while executing dynamodb command", async () => {
        const fetchExecute = createFetchExecute({
            maxBatchSize: 50,
            maxRetries: 2,
            retryDelay: 10
        });

        table.add({
            command: "put",
            PK: "pk1",
            SK: "sk1"
        });

        const bundles = table.bundle();
        expect(bundles).toHaveLength(1);

        const bundle = bundles[0];

        console.error = jest.fn();

        try {
            const result = await fetchExecute.execute({
                client: {
                    send: async () => {
                        throw new Error("Unspecified error.");
                    }
                },
                table,
                bundle
            });
            expect(result).toEqual("SHOULD NOT REACH!");
        } catch (ex) {
            expect(ex.message).toEqual("Unspecified error.");
        }

        expect(console.error).toHaveBeenCalledWith(
            `Max retries reached. Could not fetch items from table: ${process.env.DB_TABLE}`
        );
    });
});
