import type { IHandler } from "./types.js";
import { convertException } from "@webiny/utils";
import { createOnRequestResponse, createOnRequestTimeout } from "@webiny/handler";

const execute = async (handler: IHandler) => {
    try {
        await handler.flush();
    } catch (ex) {
        console.error("Error flushing DynamoDB data into the Sync System.");
        console.log(convertException(ex, ["message"]));
    }
};

export const createSendDataToEventBridgeOnRequestEnd = (handler: IHandler) => {
    return [
        createOnRequestResponse(async () => {
            execute(handler);
        }),
        createOnRequestTimeout(async () => {
            execute(handler);
        })
    ];
};
