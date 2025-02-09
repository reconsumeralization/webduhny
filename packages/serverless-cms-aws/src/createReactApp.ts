import type { CreateReactPulumiAppParams } from "@webiny/pulumi-aws";
import type { PluginCollection } from "@webiny/plugins/types";

export interface CreateReactAppParams extends CreateReactPulumiAppParams {
    plugins?: PluginCollection;
}

export function createReactApp(projectAppParams: CreateReactAppParams) {
    return {
        id: projectAppParams.name,
        name: projectAppParams.name,
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need a "deploy" option while developing).
            watch: {
                deploy: false
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createReactPulumiApp } = await import("@webiny/pulumi-aws");

            return createReactPulumiApp(projectAppParams);
        },
        async getPlugins() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { uploadAppToS3 } = await import("./react/plugins/index.js");

            const builtInPlugins = [uploadAppToS3({ folder: projectAppParams.folder })];
            const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

            return [builtInPlugins, customPlugins];
        }
    };
}
