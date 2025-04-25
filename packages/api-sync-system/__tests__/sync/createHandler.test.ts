import { createHandler } from "~/sync/createHandler";
import { createMockSystem } from "~tests/sync/mocks/system.js";
import { createMockManifest } from "~tests/sync/mocks/manifest.js";
import { Handler } from "~/sync/handler/Handler.js";
import { HandlerConverter } from "~/sync/handler/HandlerConverter.js";
import { createMockEventBridgeClient } from "~tests/sync/mocks/eventBridgeClient.js";

describe("createHandler", () => {
    it("should create a handler", async () => {
        const send = jest.fn();

        const { handler, converter } = createHandler({
            client: createMockEventBridgeClient({
                send
            }),
            system: createMockSystem(),
            manifest: createMockManifest()
        });

        expect(handler).toBeInstanceOf(Handler);
        expect(converter).toBeInstanceOf(HandlerConverter);
    });
});
