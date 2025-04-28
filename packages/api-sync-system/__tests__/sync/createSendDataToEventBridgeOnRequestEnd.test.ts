import { createSendDataToEventBridgeOnRequestEnd } from "~/sync/createSendDataToEventBridgeOnRequestEnd.js";
import { createMockSyncHandler } from "~tests/mocks/syncHandler.js";
import { OnRequestResponsePlugin } from "@webiny/handler/plugins/OnRequestResponsePlugin.js";
import { OnRequestTimeoutPlugin } from "@webiny/handler/plugins/OnRequestTimeoutPlugin.js";

describe("createSendDataToEventBridgeOnRequestEnd", () => {
    it("should create plugins to attach handler to request end", () => {
        const handler = createMockSyncHandler();

        const result = createSendDataToEventBridgeOnRequestEnd(handler);

        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(OnRequestResponsePlugin);
        expect(result[1]).toBeInstanceOf(OnRequestTimeoutPlugin);
    });
});
