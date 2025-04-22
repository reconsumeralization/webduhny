import { Plugin } from "@webiny/plugins";
import type { CommandType } from "~/types.js";
import type {
    IRecordsDataSystemTable,
    IRecordsDataSystemTableBundle
} from "~/resolver/app/data/RecordsDataSystemTable.js";
import type { IRecordsDataSystem } from "~/resolver/app/data/RecordsDataSystem.js";
import type { IFetcher } from "~/resolver/app/fetcher/types.js";
import type { IStorer } from "~/resolver/app/storer/types.js";
import type { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin.js";

export interface ICommandHandlerPluginCallableParams {
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
    fetcher: IFetcher;
    storer: IStorer;
    plugins: TransformRecordPlugin[];
}

export interface ICommandHandlerPluginCallable {
    (params: ICommandHandlerPluginCallableParams): Promise<void>;
}

export interface ICommandHandlerPluginCanHandleCallable {
    (command: CommandType): boolean;
}

export interface ICommandHandlerPluginHandleParams {
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
    fetcher: IFetcher;
    storer: IStorer;
    plugins: TransformRecordPlugin[];
}

export interface ICommandHandlerPluginParams {
    handle: ICommandHandlerPluginCallable;
    canHandle: ICommandHandlerPluginCanHandleCallable;
}

export class CommandHandlerPlugin extends Plugin {
    public static override type: string = "syncSystem.commandHandlerPlugin";

    private readonly config: ICommandHandlerPluginParams;

    public constructor(params: ICommandHandlerPluginParams) {
        super();
        this.config = params;
    }

    public canHandle(command: CommandType): boolean {
        return this.config.canHandle(command);
    }

    public async handle(params: ICommandHandlerPluginHandleParams): Promise<void> {
        return await this.config.handle({
            bundle: params.bundle,
            system: params.system,
            table: params.table,
            fetcher: params.fetcher,
            storer: params.storer,
            plugins: params.plugins
        });
    }
}

export const createCommandHandlerPlugin = (
    params: ICommandHandlerPluginParams
): CommandHandlerPlugin => {
    return new CommandHandlerPlugin(params);
};
