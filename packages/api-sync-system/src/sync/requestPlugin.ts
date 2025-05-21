import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { ICommandConverter, ISystem } from "~/sync/types.js";
import { createHandlerOnRequest } from "@webiny/handler";
import { getManifest } from "~/sync/utils/manifest.js";
import { attachToDynamoDbDocument } from "~/sync/attachToDynamoDbDocument.js";
import { createSendDataToEventBridgeOnRequestEnd } from "~/sync/createSendDataToEventBridgeOnRequestEnd.js";
import { createHandler } from "./createHandler.js";
import type { EventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";
import { createEventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";

export interface ICreateSyncSystemHandlerOnRequestPluginParams {
    documentClient: Pick<DynamoDBDocument, "send">;
    system: ISystem;
    client?: EventBridgeClient;
    commandConverters?: ICommandConverter[];
}

export const createSyncSystemHandlerOnRequestPlugin = (
    params: ICreateSyncSystemHandlerOnRequestPluginParams
) => {
    return createHandlerOnRequest(async (_, __, context) => {
        const { data: manifest, error } = await getManifest(params);
        if (!manifest?.sync?.region || error) {
            console.log(
                JSON.stringify({
                    error,
                    noManifest: manifest
                })
            );
            return;
        }

        const { handler } = createHandler({
            client:
                params.client ||
                createEventBridgeClient({
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
