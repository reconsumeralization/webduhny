import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi/types";
import type { IDeploymentStacks } from "~/apps/syncSystem/deployments/types.js";
import { createSyncResourceName } from "~/apps/syncSystem/createSyncResourceName.js";
import { SyncSystemEventBus } from "~/apps/syncSystem/SyncSystemEventBus.js";

export interface IAttachLambdaPolicyToAccessEventBusParams {
    app: PulumiApp;
    stacks: IDeploymentStacks;
}

export const attachLambdaPolicyToAccessEventBus = (
    params: IAttachLambdaPolicyToAccessEventBusParams
) => {
    const { app, stacks } = params;

    const { eventBus } = app.getModule(SyncSystemEventBus);

    return stacks.map(stack => {
        const stackName = [stack.env, stack.variant].filter(Boolean).join("-");

        const lambdaToEventBridgeResourceName = createSyncResourceName(
            `${stackName}-lambda-to-event-bridge`
        );
        const eventBridgePolicy = app.addResource(aws.iam.Policy, {
            name: `${lambdaToEventBridgeResourceName}-policy`,
            config: {
                policy: eventBus.output.arn.apply(arn =>
                    JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Effect: "Allow",
                                Action: "events:PutEvents",
                                Resource: arn
                            }
                        ]
                    })
                )
            }
        });
        /**
         * We need to attach the policy to:
         * * GraphQL Lambda Role
         * * File Manager Manage Lambda Role
         * TODO determine if any other are required
         */
        const graphQlPolicyAttachment = app.addResource(aws.iam.RolePolicyAttachment, {
            name: `${lambdaToEventBridgeResourceName}-graphql-role-policy-attachment`,
            config: {
                role: stack.api.graphqlLambdaRoleName,
                policyArn: eventBridgePolicy.output.arn
            }
        });
        const fileManagerManagePolicyAttachment = app.addResource(aws.iam.RolePolicyAttachment, {
            name: `${lambdaToEventBridgeResourceName}-fm-role-policy-attachment`,
            config: {
                role: stack.api.fileManagerManageLambdaRoleName,
                policyArn: eventBridgePolicy.output.arn
            }
        });
        return {
            ...stack,
            eventBridgePolicy,
            graphQlPolicyAttachment,
            fileManagerManagePolicyAttachment
        };
    });
};
