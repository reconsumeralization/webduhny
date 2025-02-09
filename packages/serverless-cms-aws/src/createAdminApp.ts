import type { CreateAdminPulumiAppParams } from "@webiny/pulumi-aws";
import { PluginCollection } from "@webiny/plugins/types";

export interface CreateAdminAppParams extends CreateAdminPulumiAppParams {
    plugins?: PluginCollection;
}

export function createAdminApp(projectAppParams: CreateAdminAppParams = {}) {
    return {
        id: "admin",
        name: "Admin",
        description: "Your project's admin area.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need deploy option while developing).
            watch: {
                deploy: false
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createAdminPulumiApp } = await import("@webiny/pulumi-aws");

            return createAdminPulumiApp(projectAppParams);
        },
        async getPlugins() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { uploadAppToS3 } = await import("./react/plugins/index.js");

            // eslint-disable-next-line import/dynamic-import-chunkname
            const { ensureApiDeployedBeforeBuild } = await import("./admin/plugins/index.js");

            const builtInPlugins = [
                uploadAppToS3({ folder: "apps/admin" }),
                ensureApiDeployedBeforeBuild
            ];

            const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

            return [builtInPlugins, customPlugins];
        }
    };
}
