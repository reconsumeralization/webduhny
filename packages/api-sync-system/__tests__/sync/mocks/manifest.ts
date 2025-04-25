import type { IManifest } from "~/sync/types.js";

export interface ICreateMockManifestParams {
    region?: string;
    eventBusName?: string;
    eventBusArn?: string;
}

export const createMockManifest = (params?: ICreateMockManifestParams): IManifest => {
    const {
        region = "eu-central-1",
        eventBusName = "event-bus-name",
        eventBusArn = "arn:aws:events:eu-central-1:123456789012:event-bus/event-bus-name"
    } = params || {};
    return {
        sync: {
            region,
            eventBusName,
            eventBusArn
        }
    };
};
