import { createSyncHandler, type IHandlerParams } from "~/sync/handler/Handler.js";
import { createMockEventBridgeClient } from "~tests/mocks/eventBridgeClient.js";
import { createMockSystem } from "~tests/mocks/system.js";
import { createMockHandlerConverter } from "~tests/mocks/handlerConverter.js";
import { createMockEventBus } from "~tests/mocks/eventBus.js";

export const createMockSyncHandler = (params: Partial<IHandlerParams> = {}) => {
    return createSyncHandler({
        client: params.client || createMockEventBridgeClient(),
        system: params.system || createMockSystem(),
        converter: params.converter || createMockHandlerConverter(),
        eventBus: params.eventBus || createMockEventBus()
    });
};
