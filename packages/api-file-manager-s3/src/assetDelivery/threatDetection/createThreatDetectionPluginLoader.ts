import { PluginFactory } from "@webiny/plugins/types";
import { createConditionalPluginFactory } from "@webiny/api-core";

export const createThreatDetectionPluginLoader = (cb: PluginFactory) => {
    return createConditionalPluginFactory(
        () => process.env.WEBINY_FUNCTION_TYPE === "threat-detection-event-handler",
        cb
    );
};
