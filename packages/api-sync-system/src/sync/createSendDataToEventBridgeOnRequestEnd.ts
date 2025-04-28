import type { IHandler } from "./types.js";
import { convertException } from "@webiny/utils";
import { createOnRequestResponse, createOnRequestTimeout } from "@webiny/handler";

const execute = async (handler: IHandler) => {
    try {
        await handler.flush();
    } catch (ex) {
        /**
         * We do not want to throw an error here, because we are in the request end.
         * Just log it and exit.
         */
        console.error("Error flushing DynamoDB data into the Sync System.");
        console.log(convertException(ex, ["message"]));
    }
};

export const createSendDataToEventBridgeOnRequestEnd = (handler: IHandler) => {
    return [
        createOnRequestResponse(async () => {
            return execute(handler);
        }),
        createOnRequestTimeout(async () => {
            return execute(handler);
        })
    ];
};
