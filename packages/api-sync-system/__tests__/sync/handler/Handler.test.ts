import { Handler } from "~/sync/handler/Handler.js";
import { createMockEventBridgeClient } from "~tests/mocks/eventBridgeClient.js";
import { createMockHandlerConverter } from "~tests/mocks/handlerConverter.js";
import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    UpdateCommand
} from "@webiny/aws-sdk/client-dynamodb";
import { createMockSyncHandler } from "~tests/mocks/syncHandler.js";

describe("Handler", () => {
    it("should create a sync handler", async () => {
        const handler = createMockSyncHandler();

        expect(handler).toBeInstanceOf(Handler);
    });

    it("should add commands and flush them", async () => {
        const send = jest.fn();

        const client = createMockEventBridgeClient({
            send
        });

        const handler = createMockSyncHandler({
            client,
            converter: createMockHandlerConverter({
                commandConverters: "all"
            })
        });

        expect(client.send).not.toHaveBeenCalled();

        /**
         * No commands so nothing to flush.
         */
        await handler.flush();
        expect(send).not.toHaveBeenCalled();

        handler.add(
            new GetCommand({
                TableName: "test",
                Key: {
                    PK: "pk0",
                    SK: "sk0"
                }
            })
        );

        handler.add(
            new PutCommand({
                TableName: "test",
                Item: {
                    PK: "pk1",
                    SK: "sk1"
                }
            })
        );
        handler.add(
            new DeleteCommand({
                TableName: "test",
                Key: {
                    PK: "pk2",
                    SK: "sk2"
                }
            })
        );

        handler.add(
            new UpdateCommand({
                TableName: "test",
                Key: {
                    PK: "pk3",
                    SK: "sk3"
                }
            })
        );

        // @ts-expect-error
        expect(handler.commands).toHaveLength(4);

        await handler.flush();
        // @ts-expect-error
        expect(handler.commands).toHaveLength(0);

        expect(send).toHaveBeenCalledTimes(1);
    });

    it("should throw an error on flush due to unknown error", async () => {
        const client = createMockEventBridgeClient({
            send: async () => {
                throw new Error("Unspecified error.");
            }
        });

        const handler = createMockSyncHandler({
            client,
            converter: "all"
        });

        handler.add(
            new PutCommand({
                TableName: "test",
                Item: {
                    PK: "pk1",
                    SK: "sk1"
                }
            })
        );

        const errorFn = jest.fn();

        console.error = errorFn;

        try {
            const result = await handler.flush();
            expect(result).toEqual("SHOULD NOT REACH!");
        } catch (ex) {
            expect(ex.message).toEqual("Unspecified error.");
        }

        expect(errorFn).toHaveBeenCalledWith("Unspecified error.");
    });
});
