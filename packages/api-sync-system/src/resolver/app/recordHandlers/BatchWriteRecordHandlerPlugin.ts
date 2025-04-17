import { createRecordHandlerPlugin } from "~/resolver/app/RecordHandlerPlugin.js";

export const createBatchWriteRecordHandlerPlugin = () => {
    return createRecordHandlerPlugin({
        canHandle: input => {
            return input.body.detail.command === "batchWrite";
        },
        handle: async ({ input, getSourceItem, storeItem }) => {}
    });
};
