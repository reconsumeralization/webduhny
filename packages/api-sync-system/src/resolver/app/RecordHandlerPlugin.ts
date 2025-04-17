import { getDocumentClient } from "@webiny/aws-sdk/client-dynamodb";
import { Plugin } from "@webiny/plugins";
import type { IResolverSQSRecord } from "~/resolver/app/abstractions/ResolverRecord.js";

export interface IRecordHandlerPluginCallableParams {
    input: IResolverSQSRecord;
}

export interface IRecordHandlerPluginCallable {
    (params: IRecordHandlerPluginCallableParams): Promise<void>;
}

export interface IRecordHandlerPluginCanHandleCallable {
    (record: IResolverSQSRecord): boolean;
}

export interface IRecordHandlerPluginParams {
    handle: IRecordHandlerPluginCallable;
    canHandle: IRecordHandlerPluginCanHandleCallable;
}

export class RecordHandlerPlugin extends Plugin {
    public static override type: string = "syncSystem.recordHandlerPlugin";

    private readonly config: IRecordHandlerPluginParams;

    public constructor(params: IRecordHandlerPluginParams) {
        super();
        this.config = params;
    }

    public canHandle(input: IResolverSQSRecord): boolean {
        return this.config.canHandle(input);
    }

    public async handle(input: IResolverSQSRecord): Promise<void> {
        return await this.config.handle({
            input,
            getSourceItem: createGetSourceItem(input),
            storeItem: createStoreItem()
        });
    }
}

export const createRecordHandlerPlugin = (
    params: IRecordHandlerPluginParams
): RecordHandlerPlugin => {
    return new RecordHandlerPlugin(params);
};
