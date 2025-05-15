import { createCommandHandlerPlugin } from "~/resolver/plugins/CommandHandlerPlugin.js";
import { DeleteCommandHandler } from "./DeleteCommandHandler";

export const createDeleteCommandHandlerPlugin = () => {
    return createCommandHandlerPlugin({
        canHandle: command => {
            return command === "delete";
        },
        handle: async params => {
            const handler = new DeleteCommandHandler({
                storer: params.storer
            });

            return handler.handle({
                bundle: params.bundle,
                items: params.items,
                targetTable: params.targetTable,
                targetDeployment: params.targetDeployment,
                sourceTable: params.sourceTable,
                sourceDeployment: params.sourceDeployment
            });
        }
    });
};
