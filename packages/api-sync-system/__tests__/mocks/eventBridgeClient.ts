import type { EventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";

export interface ICreateMockEventBridgeClientParams {
    send?: typeof EventBridgeClient.prototype.send;
}

export const createMockEventBridgeClient = (
    params?: ICreateMockEventBridgeClientParams
): Pick<EventBridgeClient, "send"> => {
    return {
        send: params?.send || jest.fn()
    };
};
