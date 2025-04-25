import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { ICommandConverter, ISystem } from "~/sync/types.js";
import { createHandlerOnRequest } from "@webiny/handler";
import { getManifest } from "~/sync/utils/manifest.js";
import { attachToDynamoDbDocument } from "~/sync/attachToDynamoDbDocument.js";
import { createSendDataToEventBridgeOnRequestEnd } from "~/sync/createSendDataToEventBridgeOnRequestEnd.js";
import { createHandler } from "./createHandler.js";
import { createEventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";

export interface ICreateSyncSystemHandlerOnRequestPluginParams {
    documentClient: DynamoDBDocument;
    system: ISystem;
    commandConverters?: ICommandConverter[];
}

export const createSyncSystemHandlerOnRequestPlugin = (
    params: ICreateSyncSystemHandlerOnRequestPluginParams
) => {
    return createHandlerOnRequest(async (_, __, context) => {
        const manifest = await getManifest(params);
        if (!manifest?.sync?.region) {
            return;
        }

        const { handler } = createHandler({
            client: createEventBridgeClient({
                region: manifest.sync.region
            }),
            system: params.system,
            manifest,
            commandConverters: params.commandConverters
        });

        attachToDynamoDbDocument({
            handler
        });
        context.plugins.register([
            /**
             * When request ends, send the data to the EventBridge.
             */
            createSendDataToEventBridgeOnRequestEnd(handler)
        ]);
    });
};
