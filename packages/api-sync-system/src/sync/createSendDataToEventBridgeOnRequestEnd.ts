import type { IHandler } from "./types.js";
import { createOnRequestResponse, createOnRequestTimeout } from "@webiny/handler";
import type { Request as FastifyRequest } from "@webiny/handler/types";

const execute = async (handler: IHandler) => {
    try {
        await handler.flush();
    } catch (ex) {
        /**
         * We do not want to throw an error here, because we are in the request end.
         */
    }
};

const isOptionsRequest = (request: FastifyRequest): boolean => {
    if (!request?.method) {
        return false;
    }
    return request.method.toUpperCase() === "OPTIONS";
};

export const createSendDataToEventBridgeOnRequestEnd = (handler: IHandler) => {
    return [
        createOnRequestResponse(async request => {
            if (isOptionsRequest(request)) {
                return;
            }
            return execute(handler);
        }),
        createOnRequestTimeout(async request => {
            if (isOptionsRequest(request)) {
                return;
            }
            return execute(handler);
        })
    ];
};
