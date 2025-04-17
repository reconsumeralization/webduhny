import { WebinyError } from "@webiny/error";
import type { IRecordHandler, IRecordHandlerHandleParams } from "./abstractions/RecordHandler.js";
import type { IResolverSQSRecord } from "./abstractions/ResolverRecord.js";
import type { RecordHandlerPlugin } from "./RecordHandlerPlugin.js";

export interface IRecordHandlerParams {
    plugins: RecordHandlerPlugin[];
}

export class RecordHandler implements IRecordHandler {
    private readonly plugins: RecordHandlerPlugin[];

    public constructor(params: IRecordHandlerParams) {
        this.plugins = params.plugins;
    }

    public async handle(params: IRecordHandlerHandleParams): Promise<void> {
        const { data } = params;

        const systems = data.getSystems();
        for (const system of systems) {
        }

        for (const plugin of this.plugins) {
            if (!plugin.canHandle(record)) {
                continue;
            }
            await plugin.handle(record);
        }
        throw new WebinyError("Record could not be handled.");
    }
}

export const createRecordHandler = (params: IRecordHandlerParams): IRecordHandler => {
    return new RecordHandler(params);
};
