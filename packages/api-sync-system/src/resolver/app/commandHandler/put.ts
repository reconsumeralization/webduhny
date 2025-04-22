import { createCommandHandlerPlugin } from "~/resolver/app/CommandHandlerPlugin.js";
import { PutCommandHandler } from "./PutCommandHandler";

export const createPutCommandHandlerPlugin = () => {
    return createCommandHandlerPlugin({
        canHandle: command => {
            return command === "put";
        },
        handle: async params => {
            const handler = new PutCommandHandler({
                plugins: params.plugins,
                fetcher: params.fetcher,
                storer: params.storer
            });

            return handler.handle({
                bundle: params.bundle,
                table: params.table,
                system: params.system
            });
        }
    });
};
