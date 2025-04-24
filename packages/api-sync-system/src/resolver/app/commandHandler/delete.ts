import { createCommandHandlerPlugin } from "~/resolver/plugins/CommandHandlerPlugin.js";
import { DeleteCommandHandler } from "./DeleteCommandHandler";

export const createDeleteCommandHandlerPlugin = () => {
    return createCommandHandlerPlugin({
        canHandle: command => {
            return command === "delete";
        },
        handle: async params => {
            const handler = new DeleteCommandHandler({
                fetcher: params.fetcher,
                storer: params.storer
            });

            return handler.handle({
                bundle: params.bundle,
                table: params.table,
                deployment: params.deployment
            });
        }
    });
};
