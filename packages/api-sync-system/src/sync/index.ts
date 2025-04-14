import { attachToDynamoDbDocument } from "./attachToDynamoDbDocument.js";
import type { Plugin } from "@webiny/plugins";
import { createHandlerOnRequest } from "@webiny/handler";
import { createSendDataToEventBridgeOnRequestEnd } from "./createSendDataToEventBridgeOnRequestEnd.js";
import { createNullCommand } from "./handler/commands/NullCommand.js";
import type { ICommandConverter, ISystem } from "./types.js";
import { validateSystemInput } from "./utils/validateSystemInput.js";
import { createEventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";
import { ServiceDiscovery } from "@webiny/api";
import zod from "zod";
import { convertException, createZodError } from "@webiny/utils";
import { createBatchWriteCommandConverter } from "./handler/converter/BatchWriteCommandConverter.js";
import { createHandlerConverter } from "./handler/HandlerConverter.js";
import { createSyncHandler } from "./handler/Handler.js";
import { createPutCommandConverter } from "./handler/converter/PutCommandConverter.js";
import { createDeleteCommandConverter } from "./handler/converter/DeleteCommandConverter.js";
import { createBatchGetCommandConverter } from "./handler/converter/BatchGetCommandConverter.js";
import { createGetCommandConverter } from "./handler/converter/GetCommandConverter.js";
import { createUpdateCommandConverter } from "./handler/converter/UpdateCommandConverter.js";

export interface ICreateSyncSystemParams {
    system: Partial<ISystem>;
}

export interface ICreateSyncSystemResponse {
    plugins(): Plugin[];
}

const emptyResponse: ICreateSyncSystemResponse = {
    plugins() {
        return [];
    }
};

const validateManifest = zod.object({
    sync: zod.object({
        eventBusArn: zod.string(),
        eventBusName: zod.string(),
        region: zod.string()
    })
});

const getManifest = async () => {
    try {
        const manifest = await ServiceDiscovery.load();
        const { data, error } = validateManifest.safeParse(manifest);
        if (error) {
            console.error("Sync System: Failed to validate manifest.");
            console.info(convertException(createZodError(error)));
            return null;
        }
        return data;
    } catch (ex) {
        console.error("Sync System: Failed to load manifest.");
        console.info(convertException(ex));
    }
    return null;
};

interface ICreateSyncSystemHandlerOnRequestPluginParams {
    system: ISystem;
    commandConverters?: ICommandConverter[];
}

const createSyncSystemHandlerOnRequestPlugin = (
    params: ICreateSyncSystemHandlerOnRequestPluginParams
) => {
    return createHandlerOnRequest(async (_, __, context) => {
        const manifest = await getManifest();
        if (!manifest?.sync) {
            return;
        }
        const converter = createHandlerConverter({
            default: createNullCommand()
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
        return emptyResponse;
    }

    return {
        plugins: () => {
            return [
                createSyncSystemHandlerOnRequestPlugin({
                    system
                })
            ];
        }
    };
};
