import { createRecordsData, RecordsData } from "~/resolver/app/data/RecordsData.js";
import { createRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";
import { createRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import { createMockDeployment } from "~tests/mocks/deployments.js";
import { createMockSystem } from "~tests/mocks/system.js";

describe("RecordsData", () => {
    const tableName = process.env.DB_TABLE as string;

    it("should create data via class", async () => {
        const data = new RecordsData({
            createRecordsDataDeployment: name => {
                return createRecordsDataDeployment({
                    deployment: createMockDeployment({ name }),
                    createRecordsDataDeploymentTable(item) {
                        return createRecordsDataDeploymentTable({
                            name: item.tableName,
                            createRecordsDataDeploymentTableItem: ({ item }) => {
                                return createRecordsDataDeploymentTableItem(item);
                            }
                        });
                    }
                });
            }
        });

        expect(data).toEqual({
            createRecordsDataDeployment: expect.any(Function),
            data: []
        });
    });

    it("should create data via function", async () => {
        const data = createRecordsData({
            createRecordsDataDeployment: name => {
                return createRecordsDataDeployment({
                    deployment: createMockDeployment({ name }),
                    createRecordsDataDeploymentTable(item) {
                        return createRecordsDataDeploymentTable({
                            name: item.tableName,
                            createRecordsDataDeploymentTableItem: ({ item }) => {
                                return createRecordsDataDeploymentTableItem(item);
                            }
                        });
                    }
                });
            }
        });

        expect(data).toEqual({
            createRecordsDataDeployment: expect.any(Function),
            data: []
        });
    });

    it("should ingest data", async () => {
        const data = createRecordsData({
            createRecordsDataDeployment: name => {
                return createRecordsDataDeployment({
                    deployment: createMockDeployment({ name }),
                    createRecordsDataDeploymentTable(item) {
                        return createRecordsDataDeploymentTable({
                            name: item.tableName,
                            createRecordsDataDeploymentTableItem: ({ item }) => {
                                return createRecordsDataDeploymentTableItem(item);
                            }
                        });
                    }
                });
            }
        });

        await data.ingest({
            records: [
                {
                    body: {
                        detail: {
                            items: [
                                {
                                    tableName,
                                    command: "put",
                                    PK: "pk1put",
                                    SK: "sk1put"
                                },
                                {
                                    tableName,
                                    command: "delete",
                                    PK: "pk2delete",
                                    SK: "sk2delete"
                                },
                                {
                                    tableName,
                                    command: "delete",
                                    PK: "pk3delete",
                                    SK: "sk3delete"
                                }
                            ],
                            source: createMockSystem({
                                env: "dev",
                                variant: "blue"
                            })
                        }
                    }
                }
            ]
        });

        const deployments = data.getDeployments();

        expect(deployments).toHaveLength(1);
    });
});
