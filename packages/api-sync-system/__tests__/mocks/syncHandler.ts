import { createSyncHandler, type IHandlerParams } from "~/sync/handler/Handler.js";
import { createMockEventBridgeClient } from "~tests/mocks/eventBridgeClient.js";
import { createMockSystem } from "~tests/mocks/system.js";
import { createMockHandlerConverter } from "~tests/mocks/handlerConverter.js";
import { createMockEventBus } from "~tests/mocks/eventBus.js";

export interface ICreateMockSyncHandlerParams extends Omit<IHandlerParams, "converter"> {
    converter: "all" | IHandlerParams["converter"];
}

export const createMockSyncHandler = (params: Partial<ICreateMockSyncHandlerParams> = {}) => {
    const converter =
        params.converter === "all"
            ? createMockHandlerConverter({
                  commandConverters: "all"
              })
            : params.converter || createMockHandlerConverter();
    return createSyncHandler({
        client: params.client || createMockEventBridgeClient(),
        system: params.system || createMockSystem(),
        converter,
        eventBus: params.eventBus || createMockEventBus()
    });
};
