/**
 * We need to attach Sync System Lambda policy to access DynamoDB in the Webiny system.
 */
import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi";
import type { IGetSyncSystemOutputResult } from "~/apps/syncSystem/types.js";
import { createSyncResourceName } from "~/apps/syncSystem/createSyncResourceName.js";
import type { CoreOutput } from "~/apps/common/CoreOutput.js";

export interface IAttachDynamoDbPermissionsParams {
    app: PulumiApp;
    syncSystem: IGetSyncSystemOutputResult;
    core: CoreOutput;
}

export const attachDynamoDbPermissions = (params: IAttachDynamoDbPermissionsParams) => {
    const { app, syncSystem, core } = params;

    const { lambdaRoleName } = syncSystem;

    const lambdaToDynamoDbResourceName = createSyncResourceName(`lambda-to-dynamodb`);

    const dynamoDbPolicy = app.addResource(aws.iam.Policy, {
        name: `${lambdaToDynamoDbResourceName}-policy`,
        config: {
            description: "This policy enables access from Sync System Lambda to Webiny DynamoDB.",
            policy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:BatchGetItem",
                            "dynamodb:BatchWriteItem",
                            "dynamodb:ConditionCheckItem",
                            "dynamodb:CreateBackup",
                            "dynamodb:CreateTable",
                            "dynamodb:CreateTableReplica",
                            "dynamodb:DeleteBackup",
                            "dynamodb:DeleteItem",
                            "dynamodb:DeleteTable",
                            "dynamodb:DeleteTableReplica",
                            "dynamodb:DescribeBackup",
                            "dynamodb:DescribeContinuousBackups",
                            "dynamodb:DescribeContributorInsights",
                            "dynamodb:DescribeExport",
                            "dynamodb:DescribeKinesisStreamingDestination",
                            "dynamodb:DescribeLimits",
                            "dynamodb:DescribeReservedCapacity",
                            "dynamodb:DescribeReservedCapacityOfferings",
                            "dynamodb:DescribeStream",
                            "dynamodb:DescribeTable",
                            "dynamodb:DescribeTableReplicaAutoScaling",
                            "dynamodb:DescribeTimeToLive",
                            "dynamodb:DisableKinesisStreamingDestination",
                            "dynamodb:EnableKinesisStreamingDestination",
                            "dynamodb:ExportTableToPointInTime",
                            "dynamodb:GetItem",
                            "dynamodb:GetRecords",
                            "dynamodb:GetShardIterator",
                            "dynamodb:ListBackups",
                            "dynamodb:ListContributorInsights",
                            "dynamodb:ListExports",
                            "dynamodb:ListStreams",
                            "dynamodb:ListTables",
                            "dynamodb:ListTagsOfResource",
                            "dynamodb:PartiQLDelete",
                            "dynamodb:PartiQLInsert",
                            "dynamodb:PartiQLSelect",
                            "dynamodb:PartiQLUpdate",
                            "dynamodb:PurchaseReservedCapacityOfferings",
                            "dynamodb:PutItem",
                            "dynamodb:Query",
                            "dynamodb:RestoreTableFromBackup",
                            "dynamodb:RestoreTableToPointInTime",
                            "dynamodb:Scan",
                            "dynamodb:UpdateContinuousBackups",
                            "dynamodb:UpdateContributorInsights",
                            "dynamodb:UpdateItem",
                            "dynamodb:UpdateTable",
                            "dynamodb:UpdateTableReplicaAutoScaling",
                            "dynamodb:UpdateTimeToLive"
                        ],
                        Resource: [
                            `${core.primaryDynamodbTableArn}`,
                            `${core.primaryDynamodbTableArn}/*`
                        ]
                    }
                ]
            }
        }
    });

    const lambdaRolePolicyAttachment = app.addResource(aws.iam.RolePolicyAttachment, {
        name: `${lambdaToDynamoDbResourceName}-role-policy-attachment`,
        config: {
            role: lambdaRoleName,
            policyArn: dynamoDbPolicy.output.arn
        }
    });

    return {
        dynamoDbPolicy,
        lambdaRolePolicyAttachment
    };
};
