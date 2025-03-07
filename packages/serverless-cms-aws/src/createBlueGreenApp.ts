import type { CreateBlueGreenPulumiAppParams } from "@webiny/pulumi-aws/apps/blueGreen/createBlueGreenPulumiApp";
import { createBlueGreenPulumiApp } from "@webiny/pulumi-aws/apps/blueGreen/createBlueGreenPulumiApp";
import type { Plugin, PluginCollection } from "@webiny/plugins/types";
import { createAfterDeployPlugin } from "@webiny/cli-plugin-deploy-pulumi/plugins";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";
import { blue, green } from "chalk";

export interface CreateBlueGreenAppParams extends CreateBlueGreenPulumiAppParams {
    plugins?: PluginCollection;
}

const builtInPlugins: Plugin[] = [
    createAfterDeployPlugin(async ({ env }) => {
        const bg = getStackOutput({
            folder: "apps/blueGreen",
            env,
            /**
             * Blue / Green system cannot have any variants.
             */
            variant: undefined
        });

        const output = [
            "",
            green(`Blue / Green Router`),
            `‣ Environment name: ${blue(env)}`,
            `‣ CloudFront domain: ${bg.distributionDomain}`,
            `‣ CloudFront URL: ${bg.distributionUrl}`,
            ""
        ];
        console.log(output.join("\n"));
    })
];

export function createBlueGreenApp(projectAppParams: CreateBlueGreenAppParams) {
    const plugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

    return {
        id: "blueGreen",
        name: "Blue / Green System",
        description: "Your project's Blue / Green system.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need the deploy option while developing).
            watch: {
                // We disable local development for all AWS Lambda functions.
                // This can be changed down the line by passing another set of values
                // to the "watch" command (for example `-f ps-render-subscriber`).
                function: "none"
            }
        },
        pulumi: createBlueGreenPulumiApp(projectAppParams),
        plugins: plugins.concat([builtInPlugins])
    };
}
