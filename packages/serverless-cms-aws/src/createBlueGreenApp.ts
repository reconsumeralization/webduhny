import {
    createBlueGreenPulumiApp,
    CreateBlueGreenPulumiAppParams
} from "@webiny/pulumi-aws/apps/blueGreen/createBlueGreenPulumiApp";
import { PluginCollection } from "@webiny/plugins/types";

export interface CreateBlueGreenAppParams extends CreateBlueGreenPulumiAppParams {
    plugins?: PluginCollection;
}

export function createBlueGreenApp(projectAppParams: CreateBlueGreenAppParams = {}) {
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
        plugins
    };
}
