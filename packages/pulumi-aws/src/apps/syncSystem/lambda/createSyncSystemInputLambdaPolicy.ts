import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi";
import { SyncSystemSQS } from "~/apps/syncSystem/SyncSystemSQS.js";

interface ICreateSyncSystemLambdaPolicyParams {
    name: string;
    app: PulumiApp;
}

export function createSyncSystemInputLambdaPolicy(params: ICreateSyncSystemLambdaPolicyParams) {
    const { app } = params;
    const sqs = app.getModule(SyncSystemSQS);

    const policy: aws.iam.PolicyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Sid: "PermissionForSQS",
                Effect: "Allow",
                Action: [
                    "sqs:SendMessage",
                    "sqs:SendMessageBatch",
                    "sqs:ReceiveMessage",
                    "sqs:DeleteMessage",
                    "sqs:DeleteMessageBatch",
                    "sqs:ChangeMessageVisibility",
                    "sqs:ChangeMessageVisibilityBatch",
                    "sqs:GetQueueAttributes"
                ],
                Resource: [
                    sqs.output.arn.apply(arn => `${arn}`),
                    sqs.output.arn.apply(arn => `${arn}/*`)
                ]
            }
        ]
    };

    return app.addResource(aws.iam.Policy, {
        name: params.name,
        config: {
            description: "This policy enables access to Dynamodb, S3 and Lambda.",
            policy
        }
    });
}
