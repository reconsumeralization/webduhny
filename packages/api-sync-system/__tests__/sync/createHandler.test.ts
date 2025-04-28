import { createHandler } from "~/sync/createHandler";
import { createMockSystem } from "~tests/mocks/system.js";
import { createMockManifest } from "~tests/mocks/manifest.js";
import { Handler } from "~/sync/handler/Handler.js";
import { HandlerConverter } from "~/sync/handler/HandlerConverter.js";
import { createMockEventBridgeClient } from "~tests/mocks/eventBridgeClient.js";
import {
    BatchGetCommand,
    BatchWriteCommand,
    DeleteCommand,
    GetCommand,
    PutCommand,
    UpdateCommand
} from "@webiny/aws-sdk/client-dynamodb";
import { PutCommandValue } from "~/sync/handler/converter/commands/PutCommandValue.js";
import { UpdateCommandValue } from "~/sync/handler/converter/commands/UpdateCommandValue";
import { NullCommandValue } from "~/sync/handler/converter/commands/NullCommandValue.js";
import { DeleteCommandValue } from "~/sync/handler/converter/commands/DeleteCommandValue";
import { BatchWriteCommandValue } from "~/sync/handler/converter/commands/BatchWriteCommandValue.js";

describe("createHandler", () => {
    it("should create a handler and a converter", async () => {
        const { handler, converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        expect(handler).toBeInstanceOf(Handler);
        expect(converter).toBeInstanceOf(HandlerConverter);
    });

    it("should convert delete command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new DeleteCommand({
                TableName: "test",
                Key: {
                    PK: "p1",
                    SK: "s1"
                }
            })
        );

        expect(result).toBeInstanceOf(DeleteCommandValue);
        const items = result.getItems();
        expect(items).toHaveLength(1);
        expect(items?.[0]).toEqual({
            command: "delete",
            PK: "p1",
            SK: "s1",
            tableName: "test"
        });
    });

    it("should convert put command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new PutCommand({
                TableName: "test",
                Item: {
                    PK: "p1",
                    SK: "s1"
                }
            })
        );

        expect(result).toBeInstanceOf(PutCommandValue);
        const items = result.getItems();
        expect(items).toHaveLength(1);
        expect(items?.[0]).toEqual({
            command: "put",
            PK: "p1",
            SK: "s1",
            tableName: "test"
        });
    });

    it("should convert update command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new UpdateCommand({
                TableName: "test",
                Key: {
                    PK: "p1",
                    SK: "s1"
                }
            })
        );

        expect(result).toBeInstanceOf(UpdateCommandValue);
        const items = result.getItems();
        expect(items).toHaveLength(1);
        expect(items?.[0]).toEqual({
            command: "update",
            PK: "p1",
            SK: "s1",
            tableName: "test"
        });
    });

    it("should convert get command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new GetCommand({
                TableName: "test",
                Key: {
                    PK: "p1",
                    SK: "s1"
                }
            })
        );

        expect(result).toBeInstanceOf(NullCommandValue);
        const items = result.getItems();
        expect(items).toBeNull();
    });

    it("should convert batch get command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new BatchGetCommand({
                RequestItems: {
                    test: {
                        Keys: [
                            {
                                PK: "p1",
                                SK: "s1"
                            },
                            {
                                PK: "p2",
                                SK: "s2"
                            }
                        ]
                    }
                }
            })
        );

        expect(result).toBeInstanceOf(NullCommandValue);
        const items = result.getItems();
        expect(items).toBeNull();
    });

    it("should convert batch write command", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new BatchWriteCommand({
                RequestItems: {
                    test: [
                        {
                            PutRequest: {
                                Item: {
                                    PK: "p1",
                                    SK: "s1"
                                }
                            }
                        },
                        {
                            DeleteRequest: {
                                Key: {
                                    PK: "p2",
                                    SK: "s2"
                                }
                            }
                        },
                        {
                            PutRequest: {
                                Item: {
                                    PK: "p3",
                                    SK: "s3"
                                }
                            }
                        },
                        {
                            DeleteRequest: {
                                Key: {
                                    PK: "p4",
                                    SK: "s4"
                                }
                            }
                        },
                        {
                            DeleteRequest: {
                                Key: {
                                    PK: "p5",
                                    SK: "s5"
                                }
                            }
                        }
                    ]
                }
            })
        );

        expect(result).toBeInstanceOf(BatchWriteCommandValue);
        const items = result.getItems();
        expect(items).toHaveLength(5);
        expect(items).toEqual([
            {
                command: "put",
                PK: "p1",
                SK: "s1",
                tableName: "test"
            },
            {
                command: "delete",
                PK: "p2",
                SK: "s2",
                tableName: "test"
            },
            {
                command: "put",
                PK: "p3",
                SK: "s3",
                tableName: "test"
            },
            {
                command: "delete",
                PK: "p4",
                SK: "s4",
                tableName: "test"
            },
            {
                command: "delete",
                PK: "p5",
                SK: "s5",
                tableName: "test"
            }
        ]);
    });

    it("should not convert batch write command if no table", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new BatchWriteCommand({
                RequestItems: {}
            })
        );

        expect(result).toBeInstanceOf(BatchWriteCommandValue);
        const items = result.getItems();
        expect(items).toBeNull();
    });

    it("should not convert batch write command if no items in table", async () => {
        const { converter } = createHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        const result = converter.convert(
            new BatchWriteCommand({
                RequestItems: {
                    test: []
                }
            })
        );

        expect(result).toBeInstanceOf(BatchWriteCommandValue);
        const items = result.getItems();
        expect(items).toBeNull();
    });
});
