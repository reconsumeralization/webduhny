import {
    createRecordsDataDeploymentTable,
    RecordsDataDeploymentTable
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import { DYNAMODB_REGULAR } from "~tests/mocks/constants.js";

describe("RecordsDataDeploymentTable", () => {
    const tableName = process.env.DB_TABLE as string;
    it("should create table via class", () => {
        const table = new RecordsDataDeploymentTable({
            name: tableName,
            type: DYNAMODB_REGULAR,
            createRecordsDataDeploymentTableItem: ({ item }) => {
                return createRecordsDataDeploymentTableItem(item);
            }
        });

        expect(table).toEqual({
            createRecordsDataDeploymentTableItem: expect.any(Function),
            items: [],
            name: tableName,
            type: DYNAMODB_REGULAR
        });
    });

    it("should create table via function", () => {
        const table = createRecordsDataDeploymentTable({
            name: tableName,
            type: DYNAMODB_REGULAR,
            createRecordsDataDeploymentTableItem: ({ item }) => {
                return createRecordsDataDeploymentTableItem(item);
            }
        });

        expect(table).toEqual({
            createRecordsDataDeploymentTableItem: expect.any(Function),
            items: [],
            name: tableName,
            type: DYNAMODB_REGULAR
        });
    });

    it("should add items to the table", () => {
        const table = createRecordsDataDeploymentTable({
            name: tableName,
            type: DYNAMODB_REGULAR,
            createRecordsDataDeploymentTableItem: ({ item }) => {
                return createRecordsDataDeploymentTableItem(item);
            }
        });

        table.add({
            command: "put",
            PK: "pk1put",
            SK: "sk1put"
        });
        table.add({
            command: "put",
            PK: "pk2put",
            SK: "sk2put"
        });
        table.add({
            command: "delete",
            PK: "pk3delete",
            SK: "sk3delete"
        });
        table.add({
            command: "put",
            PK: "pk4put",
            SK: "sk4put"
        });
        table.add({
            command: "delete",
            PK: "pk5delete",
            SK: "sk5delete"
        });

        expect(table.getItems()).toEqual([
            createRecordsDataDeploymentTableItem({
                command: "put",
                PK: "pk1put",
                SK: "sk1put"
            }),
            createRecordsDataDeploymentTableItem({
                command: "put",
                PK: "pk2put",
                SK: "sk2put"
            }),
            createRecordsDataDeploymentTableItem({
                command: "delete",
                PK: "pk3delete",
                SK: "sk3delete"
            }),
            createRecordsDataDeploymentTableItem({
                command: "put",
                PK: "pk4put",
                SK: "sk4put"
            }),
            createRecordsDataDeploymentTableItem({
                command: "delete",
                PK: "pk5delete",
                SK: "sk5delete"
            })
        ]);

        const bundles = table.bundle();

        expect(bundles).toHaveLength(4);

        expect(bundles[0]).toEqual({
            command: "put",
            items: [
                {
                    command: "put",
                    PK: "pk1put",
                    SK: "sk1put"
                },
                {
                    command: "put",
                    PK: "pk2put",
                    SK: "sk2put"
                }
            ]
        });

        expect(bundles[1]).toEqual({
            command: "delete",
            items: [
                {
                    command: "delete",
                    PK: "pk3delete",
                    SK: "sk3delete"
                }
            ]
        });

        expect(bundles[2]).toEqual({
            command: "put",
            items: [
                {
                    command: "put",
                    PK: "pk4put",
                    SK: "sk4put"
                }
            ]
        });

        expect(bundles[3]).toEqual({
            command: "delete",
            items: [
                {
                    command: "delete",
                    PK: "pk5delete",
                    SK: "sk5delete"
                }
            ]
        });
    });
});
