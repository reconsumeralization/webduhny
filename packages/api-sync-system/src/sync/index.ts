import { attachToDynamoDbDocument } from "./attachToDynamoDbDocument.js";
import type { Plugin } from "@webiny/plugins";
import { createHandlerOnRequest } from "@webiny/handler";
import { createSendDataToEventBridgeOnRequestEnd } from "./createSendDataToEventBridgeOnRequestEnd.js";
import type { ICommandConverter, ISystem } from "./types.js";
import { validateSystemInput } from "./utils/validateSystemInput.js";
import { createEventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";
import { createBatchWriteCommandConverter } from "./handler/converter/BatchWriteCommandConverter.js";
import { createHandlerConverter } from "./handler/HandlerConverter.js";
import { createSyncHandler } from "./handler/Handler.js";
import { createPutCommandConverter } from "./handler/converter/PutCommandConverter.js";
import { createDeleteCommandConverter } from "./handler/converter/DeleteCommandConverter.js";
import { createBatchGetCommandConverter } from "./handler/converter/BatchGetCommandConverter.js";
import { createGetCommandConverter } from "./handler/converter/GetCommandConverter.js";
import { createUpdateCommandConverter } from "./handler/converter/UpdateCommandConverter.js";
import { getManifest } from "./utils/manifest.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import { NullCommandValue } from "~/sync/handler/converter/commands/NullCommandValue.js";
import type { PossiblyUndefinedProperties } from "@webiny/api/types";

export interface ICreateSyncSystemParams {
    documentClient: DynamoDBDocument;
    system: PossiblyUndefinedProperties<Omit<ISystem, "name">>;
}

export interface ICreateSyncSystemResponse {
    plugins(): Plugin[];
}

const emptyResponse: ICreateSyncSystemResponse = {
    plugins() {
        return [];
    }
};

interface ICreateSyncSystemHandlerOnRequestPluginParams {
    documentClient: DynamoDBDocument;
    system: ISystem;
    commandConverters?: ICommandConverter[];
}

const createSyncSystemHandlerOnRequestPlugin = (
    params: ICreateSyncSystemHandlerOnRequestPluginParams
) => {
    return createHandlerOnRequest(async (_, __, context) => {
        const manifest = await getManifest(params);
        if (!manifest?.sync) {
            return;
        }
        const converter = createHandlerConverter({
            default: new NullCommandValue()
        });
        /**
         * We register users command converters because those are tested out first.
         * Our converters are in some order I got from my head - the most used commands are first.
         */
        converter.register(params.commandConverters || []);
        converter.register(createBatchGetCommandConverter());
        converter.register(createGetCommandConverter());
        converter.register(createBatchWriteCommandConverter());
        converter.register(createPutCommandConverter());
        converter.register(createDeleteCommandConverter());
        converter.register(createUpdateCommandConverter());

        const handler = createSyncHandler({
            system: params.system,
            client: createEventBridgeClient({
                region: manifest.sync.region
            }),
            eventBus: {
                arn: manifest.sync.eventBusArn,
                name: manifest.sync.eventBusName
            },
            converter
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

export const createSyncSystem = (params: ICreateSyncSystemParams): ICreateSyncSystemResponse => {
    const { system, error } = validateSystemInput(params.system);
    /**
     * We do not want to throw any errors. We will log them and just return a function which returns empty array as plugins.
     */
    if (error) {
        console.error(error);
        return emptyResponse;
    } else if (!system) {
        console.error("Sync System: No system provided. Sync System will not be attached.");
        return emptyResponse;
    }

    return {
        plugins: () => {
            return [
                createSyncSystemHandlerOnRequestPlugin({
                    documentClient: params.documentClient,
                    system
                })
            ];
        }
    };
};
