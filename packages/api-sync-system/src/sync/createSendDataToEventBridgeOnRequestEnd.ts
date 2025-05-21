import type { IHandler } from "./types.js";
import { convertException } from "@webiny/utils";
import { createOnRequestResponse, createOnRequestTimeout } from "@webiny/handler";
import type { Request as FastifyRequest } from "@webiny/handler/types";

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

const isOptionsRequest = (request: FastifyRequest): boolean => {
    return request.method.toUpperCase() === "OPTIONS";
};

export const createSendDataToEventBridgeOnRequestEnd = (handler: IHandler) => {
    return [
        createOnRequestResponse(async request => {
            if (isOptionsRequest(request)) {
                console.log("Skipping OPTIONS request - response.");
                return;
            }
            console.log("Executing on request end.");
            return execute(handler);
        }),
        createOnRequestTimeout(async request => {
            if (isOptionsRequest(request)) {
                console.log("Skipping OPTIONS request - timeout.");
                return;
            }
            console.log("Executing on request timeout.");
            return execute(handler);
        })
    ];
};
