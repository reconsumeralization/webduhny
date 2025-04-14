import { decorateDocumentClient } from "@webiny/aws-sdk/client-dynamodb/getDocumentClient";
import type { IHandler } from "~/sync/types.js";
import {
    BatchWriteCommand,
    PutCommand,
    UpdateCommand
} from "@webiny/aws-sdk/client-dynamodb/index.js";

export interface IAttachToDynamoDbDocumentParams {
    handler: IHandler;
}

export const attachToDynamoDbDocument = ({ handler }: IAttachToDynamoDbDocumentParams) => {
    decorateDocumentClient(client => {
        /**
         * Is there a possibility that this is already attached?
         * Let's check for the handler and then skip attaching.
         */
        // @ts-expect-error
        if (client.__webinyHandler) {
            return client;
        }
        const originalSend = client.send;
        const originalPut = client.put;
        const originalBatchWrite = client.batchWrite;
        const originalUpdate = client.update;

        // @ts-expect-error
        client.__webinyHandler = handler;

        client.send = async params => {
            // @ts-expect-error
            handler.add(params);
            return originalSend(params);
        };

        client.put = async params => {
            const cmd = new PutCommand(params);
            handler.add(cmd);
            return originalPut(params);
        };

        client.batchWrite = async params => {
            const cmd = new BatchWriteCommand(params);
            handler.add(cmd);
            return originalBatchWrite(params);
        };

        client.update = async params => {
            const cmd = new UpdateCommand(params);
            handler.add(cmd);
            return originalUpdate(params);
        };

        return client;
    });
};
