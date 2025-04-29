import { createMockDeployment } from "~tests/mocks/deployments.js";
import { createRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import {
    createRecordsDataDeployment,
    type ICreateRecordsDataDeploymentTableCallable,
    RecordsDataDeployment
} from "~/resolver/app/data/RecordsDataDeployment.js";
import * as process from "node:process";

describe("RecordsDataDeployment", () => {
    const tableName = process.env.DB_TABLE as string;
    const createRecordsDataDeploymentTableCallable: ICreateRecordsDataDeploymentTableCallable =
        params => {
            return createRecordsDataDeploymentTable({
                name: params.tableName,
                createRecordsDataDeploymentTableItem: ({ item }) => {
                    return createRecordsDataDeploymentTableItem(item);
                }
            });
        };

    it("should create deployment via class", () => {
        const mockDeployment = createMockDeployment({
            primaryDynamoDbName: tableName
        });
        const deployment = new RecordsDataDeployment({
            deployment: mockDeployment,
            createRecordsDataDeploymentTable: createRecordsDataDeploymentTableCallable
        });

        expect(deployment).toEqual({
            createRecordsDataDeploymentTable: expect.any(Function),
            tables: [],
            deployment: mockDeployment
        });
    });

    it("should create deployment via function", () => {
        const mockDeployment = createMockDeployment({
            primaryDynamoDbName: tableName
        });

        const deployment = createRecordsDataDeployment({
            deployment: mockDeployment,
            createRecordsDataDeploymentTable: createRecordsDataDeploymentTableCallable
        });

        expect(deployment).toEqual({
            createRecordsDataDeploymentTable: expect.any(Function),
            tables: [],
            deployment: mockDeployment
        });
    });

    it("should ingest items into deployment tables", async () => {
        const mockDeployment = createMockDeployment({
            primaryDynamoDbName: tableName
        });

        const deployment = createRecordsDataDeployment({
            deployment: mockDeployment,
            createRecordsDataDeploymentTable: createRecordsDataDeploymentTableCallable
        });

        await deployment.ingest({
            items: [
                {
                    command: "put",
                    PK: "pk1",
                    SK: "sk1",
                    tableName
                },
                {
                    command: "delete",
                    PK: "pk2",
                    SK: "sk2",
                    tableName
                }
            ]
        });

        const tables = deployment.getTables();
        expect(tables).toHaveLength(1);

        const bundles = tables[0].bundle();
        expect(bundles).toHaveLength(2);

        expect(bundles[0]).toEqual({
            command: "put",
            items: [
                {
                    PK: "pk1",
                    SK: "sk1",
                    command: "put"
                }
            ]
        });
        expect(bundles[1]).toEqual({
            command: "delete",
            items: [
                {
                    PK: "pk2",
                    SK: "sk2",
                    command: "delete"
                }
            ]
        });
    });
});
