import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi";
import { SyncSystemS3 } from "~/apps/syncSystem/SyncSystemS3.js";
import { SyncSystemSQS } from "~/apps/syncSystem/SyncSystemSQS.js";

interface ICreateSyncSystemLambdaPolicyParams {
    name: string;
    app: PulumiApp;
    protect: boolean;
}

export function createSyncSystemInputLambdaPolicy(params: ICreateSyncSystemLambdaPolicyParams) {
    const { app } = params;
    const s3 = app.getModule(SyncSystemS3);
    const sqs = app.getModule(SyncSystemSQS);

    const policy: aws.iam.PolicyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Sid: "PermissionForS3",
                Effect: "Allow",
                Action: ["s3:DeleteObject", "s3:PutObject", "s3:GetObject"],
                Resource: [
                    s3.output.arn.apply(arn => `${arn}`),
                    s3.output.arn.apply(arn => `${arn}/*`)
                ]
            },
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
                    "sqs:ChangeMessageVisibilityBatch"
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
        },
        opts: {
            protect: params.protect
        }
    });
}
