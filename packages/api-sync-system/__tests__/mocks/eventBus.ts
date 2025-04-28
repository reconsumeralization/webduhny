import type { IHandlerEventBus } from "~/sync/handler/Handler.js";

export const createMockEventBus = (): IHandlerEventBus => {
    return {
        arn: "arn:aws:events:eu-central-1:123456789012:event-bus/sync",
        name: "sync"
    };
};
