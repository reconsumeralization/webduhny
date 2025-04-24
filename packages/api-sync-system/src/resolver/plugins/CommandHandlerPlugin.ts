import { Plugin } from "@webiny/plugins";
import type { CommandType } from "~/types.js";
import type {
    IRecordsDataDeploymentTable,
    IRecordsDataDeploymentTableBundle
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import type { IRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";
import type { IFetcher } from "~/resolver/app/fetcher/types.js";
import type { IStorer } from "~/resolver/app/storer/types.js";
import type { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin.js";

export interface ICommandHandlerPluginCallableParams {
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
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
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
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
            deployment: params.deployment,
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
