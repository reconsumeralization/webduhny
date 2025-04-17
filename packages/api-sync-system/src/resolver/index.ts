import { createHandler as createSQSHandler, HandlerParams } from "@webiny/handler-aws/sqs";
import { PluginsContainer } from "@webiny/plugins";
import { createEventHandlerPlugin } from "./createEventHandlerPlugin.js";

/**
 * Handler for the Sync System Resolver - based on SQS handler.
 */
export const createHandler = (params: HandlerParams) => {
    const plugins = new PluginsContainer([createEventHandlerPlugin()]);

    plugins.merge(params.plugins);

    return createSQSHandler({
        ...params,
        plugins
    });
};
