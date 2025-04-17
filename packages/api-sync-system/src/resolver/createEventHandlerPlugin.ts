import { createEventHandler as createSQSEventHandler } from "@webiny/handler-aws/sqs";
import { createResolverApp } from "./app/ResolverApplication.js";
import { convertException } from "@webiny/utils";
import { createRecordHandler } from "./app/RecordHandler.js";
import { RecordHandlerPlugin } from "./app/RecordHandlerPlugin.js";

/**
 * TODO maybe add logger?
 */
export const createEventHandlerPlugin = () => {
    return createSQSEventHandler(async ({ event, context, request, reply }) => {
        const plugins = context.plugins.byType<RecordHandlerPlugin>(RecordHandlerPlugin.type);
        const recordHandler = createRecordHandler({
            plugins
        });
        const app = createResolverApp({
            recordHandler
        });

        try {
            await app.resolve({
                records: event.Records
            });
        } catch (ex) {
            console.error(convertException(ex));
        }
    });
};
