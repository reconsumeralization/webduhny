import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";
import {
    createBeforeBuildPlugin,
    createBeforeWatchPlugin
} from "@webiny/cli-plugin-deploy-pulumi/plugins";
import { GracefulError } from "@webiny/cli-plugin-deploy-pulumi/utils";
import type { Callable } from "@webiny/cli-plugin-deploy-pulumi/plugins/PulumiCommandLifecycleEventHookPlugin";

const NO_DEPLOYMENT_CHECKS_FLAG_NAME = "--no-deployment-checks";

const createPluginCallable: (command: "build" | "watch") => Callable = command => (params, ctx) => {
    const { env, inputs } = params;
    // Just in case, we want to allow users to skip the system requirements check.
    if (inputs.deploymentChecks === false) {
        return;
    }

    const output = getStackOutput({ folder: "apps/api", env });
    const apiDeployed = output && Object.keys(output).length > 0;
    if (apiDeployed) {
        return;
    }

    const apiAppName = ctx.error.hl("API");
    const websiteAppName = ctx.error.hl("Website");
    const cmd = ctx.error.hl(`yarn webiny deploy api --env ${env}`);
    ctx.error(
        `Cannot ${command} ${websiteAppName} project application before deploying ${apiAppName}.`
    );

    const message = [
        `Before ${command}ing ${websiteAppName} project application, please`,
        `deploy ${apiAppName} first by running: ${cmd}.`,
        `If you think this is a mistake, you can also try skipping`,
        `the deployment checks by appending the ${ctx.error.hl(NO_DEPLOYMENT_CHECKS_FLAG_NAME)} flag.`
    ];

    throw new GracefulError(message.join(" "));
};

export const ensureApiDeployedBeforeBuild = createBeforeBuildPlugin(createPluginCallable("build"));
ensureApiDeployedBeforeBuild.name = "website.before-deploy.ensure-api-deployed";

export const ensureApiDeployedBeforeWatch = createBeforeWatchPlugin(createPluginCallable("watch"));
ensureApiDeployedBeforeWatch.name = "website.before-watch.ensure-api-deployed";
