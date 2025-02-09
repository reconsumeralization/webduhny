import type { CreateCorePulumiAppParams } from "@webiny/pulumi-aws";
import type { PluginCollection } from "@webiny/plugins/types";

export { CoreOutput, configureAdminCognitoFederation } from "@webiny/pulumi-aws";

export interface CreateCoreAppParams extends CreateCorePulumiAppParams {
    plugins?: PluginCollection;
}

export function createCoreApp(projectAppParams: CreateCoreAppParams = {}) {
    return {
        id: "core",
        name: "Core",
        description: "Your project's stateful cloud infrastructure resources.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need the deploy option while developing).
            watch: {
                // We disable local development for all AWS Lambda functions.
                // This can be changed down the line by passing another set of values
                // to the "watch" command (for example `-f ps-render-subscriber`).
                function: "none"
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createCorePulumiApp } = await import("@webiny/pulumi-aws");

            return createCorePulumiApp(projectAppParams);
        },
        async getPlugins() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { generateDdbToEsHandler, checkEsServiceRole, checkOsServiceRole } = await import(
                "./core/plugins/index.js"
            );

            const builtInPlugins = [];
            if (projectAppParams.elasticSearch || projectAppParams.openSearch) {
                builtInPlugins.push(generateDdbToEsHandler);
                if (projectAppParams.elasticSearch) {
                    builtInPlugins.push(checkEsServiceRole);
                } else {
                    builtInPlugins.push(checkOsServiceRole);
                }
            }

            const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

            return [builtInPlugins, customPlugins];
        }
    };
}
