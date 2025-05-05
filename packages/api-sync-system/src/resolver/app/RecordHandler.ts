import type { IRecordHandler, IRecordHandlerHandleParams } from "./abstractions/RecordHandler.js";
import { CommandHandlerPlugin } from "../plugins/CommandHandlerPlugin.js";
import { convertException } from "@webiny/utils";
import type { CommandType } from "~/types.js";
import type { PluginsContainer } from "@webiny/plugins";
import { TransformRecordPlugin } from "../plugins/TransformRecordPlugin.js";
import type { IFetcher } from "~/resolver/app/fetcher/types.js";
import type { IStorer } from "~/resolver/app/storer/types.js";

export interface IRecordHandlerParams {
    fetcher: IFetcher;
    storer: IStorer;
    plugins: PluginsContainer;
}

export class RecordHandler implements IRecordHandler {
    private readonly plugins: PluginsContainer;
    private readonly commandHandlerPlugins: CommandHandlerPlugin[];
    private readonly transformRecordPlugins: TransformRecordPlugin[];
    private readonly fetcher: IFetcher;
    private readonly storer: IStorer;

    public constructor(params: IRecordHandlerParams) {
        this.plugins = params.plugins;
        this.fetcher = params.fetcher;
        this.storer = params.storer;

        this.transformRecordPlugins = this.plugins.byType<TransformRecordPlugin>(
            TransformRecordPlugin.type
        );
        this.commandHandlerPlugins = this.plugins.byType<CommandHandlerPlugin>(
            CommandHandlerPlugin.type
        );
    }

    public async handle(params: IRecordHandlerHandleParams): Promise<void> {
        const { data } = params;

        const deployments = data.getDeployments();
        for (const deployment of deployments) {
            /**
             * Need to fetch all the records from the source deployment tables.
             */
            const items = await this.fetcher.exec({
                deployment,
                maxBatchSize: 25,
                maxRetries: 10,
                retryDelay: 1000
            });

            const tables = deployment.getTables();
            for (const table of tables) {
                table.assignItems(items);
                /**
                 * We will handle the records in bundles.
                 */
                const bundles = table.bundle();

                for (const bundle of bundles) {
                    try {
                        const commandHandler = this.getCommandHandler(bundle.command);
                        await commandHandler.handle({
                            deployment,
                            table,
                            bundle,
                            plugins: this.transformRecordPlugins,
                            storer: this.storer,
                            fetcher: this.fetcher
                        });
                    } catch (ex) {
                        console.error("Could not handle a bundle.");
                        console.log(convertException(ex));
                        // TODO determine what should we do with the error.
                    }
                }
            }
        }
    }

    private getCommandHandler(command: CommandType): CommandHandlerPlugin {
        const handler = this.commandHandlerPlugins.find(plugin => plugin.canHandle(command));
        if (!handler) {
            throw new Error(`Could not find a command handler for command: ${command}`);
        }

        return handler;
    }
}

export const createRecordHandler = (params: IRecordHandlerParams): IRecordHandler => {
    return new RecordHandler(params);
};
