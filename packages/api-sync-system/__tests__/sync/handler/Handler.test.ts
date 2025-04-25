import { createSyncHandler, Handler } from "~/sync/handler/Handler";
import { createMockEventBridgeClient } from "~tests/sync/mocks/eventBridgeClient.js";
import { createMockSystem } from "~tests/sync/mocks/system.js";
import { createMockEventBus } from "../mocks/eventBus";
import { createMockHandlerConverter } from "~tests/sync/mocks/handlerConverter.js";
import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    UpdateCommand
} from "@webiny/aws-sdk/client-dynamodb";

describe("Handler", () => {
    const eventBus = createMockEventBus();

    it("should create a sync handler", async () => {
        const handler = createSyncHandler({
            client: createMockEventBridgeClient(),
            system: createMockSystem(),
            converter: createMockHandlerConverter(),
            eventBus
        });

        expect(handler).toBeInstanceOf(Handler);
    });

    it("should add commands and flush them", async () => {
        const send = jest.fn();

        const client = createMockEventBridgeClient({
            send
        });

        const handler = createSyncHandler({
            client,
            system: createMockSystem(),
            converter: createMockHandlerConverter({
                commandConverters: "all"
            }),
            eventBus
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
});
