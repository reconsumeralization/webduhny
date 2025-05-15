import { createCommandHandlerPlugin } from "~/resolver/plugins/CommandHandlerPlugin.js";
import { PutCommandHandler } from "./PutCommandHandler";

export const createPutCommandHandlerPlugin = () => {
    return createCommandHandlerPlugin({
        canHandle: command => {
            return command === "put";
        },
        handle: async params => {
            const {
                storer,
                targetTable,
                sourceTable,
                targetDeployment,
                sourceDeployment,
                items,
                bundle
            } = params;
            const handler = new PutCommandHandler({
                storer: storer
            });

            return handler.handle({
                bundle,
                targetTable,
                targetDeployment,
                sourceTable,
                sourceDeployment,
                items
            });
        }
    });
};
