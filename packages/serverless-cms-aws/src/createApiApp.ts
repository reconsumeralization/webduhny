import type { CreateApiPulumiAppParams } from "@webiny/pulumi-aws";
import type { PluginCollection } from "@webiny/plugins/types";

export { ApiOutput } from "@webiny/pulumi-aws";

export interface CreateApiAppParams extends CreateApiPulumiAppParams {
    plugins?: PluginCollection;
}

export function createApiApp(projectAppParams: CreateApiAppParams = {}) {
    return {
        id: "api",
        name: "API",
        description:
            "Represents cloud infrastructure needed for supporting your project's (GraphQL) API.",
        cli: {
            // Default args for the "yarn webiny watch ..." command.
            watch: {
                // Watch five levels of dependencies, starting from this project application.
                depth: 5,

                // By default, we only enable local development for the "graphql" function.
                // This can be changed down the line by passing another set of values
                // to the "watch" command.
                function: "graphql"
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createApiPulumiApp } = await import("@webiny/pulumi-aws");

            return createApiPulumiApp(projectAppParams);
        },
        async getPlugins() {
            const {
                ensureCoreDeployed,
                executeDataMigrations,
                generateCommonHandlers,
                generateDdbEsHandlers,
                generateDdbHandlers,
                injectWcpTelemetryClientCode
                // eslint-disable-next-line import/dynamic-import-chunkname
            } = await import("./api/plugins/index.js");

            const builtInPlugins = [
                ensureCoreDeployed,
                injectWcpTelemetryClientCode,
                generateCommonHandlers,
                executeDataMigrations
            ];

            if (projectAppParams.elasticSearch || projectAppParams.openSearch) {
                builtInPlugins.push(generateDdbEsHandlers);
            } else {
                builtInPlugins.push(generateDdbHandlers);
            }

            const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

            return [builtInPlugins, customPlugins];
        }
    };
}
