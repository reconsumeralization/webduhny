import { enableEnrichDocumentClient } from "@webiny/aws-sdk/client-dynamodb/getDocumentClient";
import type { IHandler } from "~/sync/types.js";

export interface IAttachToDynamoDbDocumentParams {
    handler: IHandler;
}

export const attachToDynamoDbDocument = ({ handler }: IAttachToDynamoDbDocumentParams) => {
    enableEnrichDocumentClient(client => {
        /**
         * Is there a possibility that this is already attached?
         * Let's check for the handler and then skip attaching.
         */
        // @ts-expect-error
        if (client.__webinyHandler) {
            return client;
        }
        const originalSend = client.send;

        // @ts-expect-error
        client.__webinyHandler = handler;

        client.send = async params => {
            /**
             * Handler will deal with the check of the command so we can basically send anything.
             */
            // @ts-expect-error
            handler.add(params);
            return originalSend(params);
        };

        return client;
    });
};
