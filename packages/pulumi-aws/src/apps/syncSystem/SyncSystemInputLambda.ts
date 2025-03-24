import path from "path";
import * as aws from "@pulumi/aws";
import type { PulumiApp, PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createLambdaRoleWithoutVpc, getCommonLambdaEnvVariables } from "../lambdaUtils.js";
import { LAMBDA_RUNTIME } from "~/constants.js";
import { createSyncSystemLambdaPolicy } from "./lambda/policy.js";
import { createResourceName } from "./createResourceName.js";
import { createAssetArchive } from "~/utils/createAssetArchive.js";
import type { RegionProvider } from "~/apps/syncSystem/types.js";

export interface SyncSystemInputLambdaParams {
    region: RegionProvider;
    protect: boolean;
    env?: Record<string, string>;
}

export type SyncSystemInputLambda = PulumiAppModule<typeof SyncSystemInputLambda>;

export const SyncSystemInputLambda = createAppModule({
    name: "SyncSystemInputLambda",
    config(app: PulumiApp, params: SyncSystemInputLambdaParams) {
        const roleName = createResourceName("input-lambda-role");
        const policy = createSyncSystemLambdaPolicy({
            name: `${roleName}-policy`,
            app,
            protect: params.protect
        });
        const role = createLambdaRoleWithoutVpc(app, {
            name: roleName,
            policy: policy.output
        });

        const lambda = app.addResource(aws.lambda.Function, {
            name: createResourceName("lambda"),
            config: {
                runtime: LAMBDA_RUNTIME,
                handler: "handler.handler",
                role: role.output.arn,
                timeout: 900,
                memorySize: 1024,
                code: createAssetArchive(path.join(app.paths.workspace, "input/build")),
                environment: {
                    variables: getCommonLambdaEnvVariables().apply(value => {
                        return {
                            ...value,
                            ...params.env,
                            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                        };
                    })
                }
            }
        });

        return {
            role,
            policy,
            lambda
        };
    }
});
