import path from "path";
import * as aws from "@pulumi/aws";
import type { PulumiApp, PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createLambdaRoleWithoutVpc } from "../lambdaUtils.js";
import { LAMBDA_RUNTIME } from "~/constants.js";
import { createSyncSystemInputLambdaPolicy } from "./lambda/createSyncSystemInputLambdaPolicy.js";
import { createResourceName } from "./createResourceName.js";
import { createAssetArchive } from "~/utils/createAssetArchive.js";
import type { RegionProvider } from "~/apps/syncSystem/types.js";

export interface SyncSystemInputLambdaParams {
    region: RegionProvider;
    protect: boolean;
}

export type SyncSystemInputLambda = PulumiAppModule<typeof SyncSystemInputLambda>;

export const SyncSystemInputLambda = createAppModule({
    name: "SyncSystemInputLambda",
    config(app: PulumiApp, params: SyncSystemInputLambdaParams) {
        const roleName = createResourceName("input-lambda-role");
        const policy = createSyncSystemInputLambdaPolicy({
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
                memorySize: 512,
                code: createAssetArchive(path.join(app.paths.workspace, "input/build")),
                environment: {
                    variables: {
                        DEBUG: String(process.env.DEBUG),
                        PULUMI_APPS: "true",
                        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                    }
                }
            },
            opts: {
                provider: params.region.provider,
                protect: params.protect
            }
        });

        return {
            role,
            policy,
            lambda
        };
    }
});
