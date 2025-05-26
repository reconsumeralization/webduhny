import { createHandlerConverter } from "~/sync/handler/HandlerConverter.js";
import { NullCommandValue } from "~/sync/handler/converter/commands/NullCommandValue.js";
import { createBatchWriteCommandConverter } from "~/sync/handler/converter/BatchWriteCommandConverter.js";
import { createPutCommandConverter } from "~/sync/handler/converter/PutCommandConverter.js";
import { createDeleteCommandConverter } from "~/sync/handler/converter/DeleteCommandConverter.js";
import { createUpdateCommandConverter } from "~/sync/handler/converter/UpdateCommandConverter.js";
import { createSyncHandler } from "~/sync/handler/Handler.js";
import type { EventBridgeClient } from "@webiny/aws-sdk/client-eventbridge/index.js";
import type { ICommandConverter, IManifest, ISystem } from "./types";

export interface ICreateHandlerParams {
    client: Pick<EventBridgeClient, "send">;
    commandConverters?: ICommandConverter[];
    system: ISystem;
    manifest: IManifest;
}

export const createHandler = (params: ICreateHandlerParams) => {
    const { manifest, commandConverters, system, client } = params;
    const converter = createHandlerConverter({
        default: new NullCommandValue()
    });
    /**
     * We register users command converters because those are tested out first.
     * Our converters are in some order I got from my head - the most used commands are first.
     */
    converter.register(commandConverters || []);
    converter.register(createBatchWriteCommandConverter());
    converter.register(createPutCommandConverter());
    converter.register(createDeleteCommandConverter());
    converter.register(createUpdateCommandConverter());

    const handler = createSyncHandler({
        system,
        client,
        eventBus: {
            arn: manifest.sync.eventBusArn,
            name: manifest.sync.eventBusName
        },
        converter
    });
    return {
        handler,
        converter
    };
};
