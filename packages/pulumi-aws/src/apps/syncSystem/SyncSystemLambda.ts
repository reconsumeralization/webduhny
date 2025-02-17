import path from "path";
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { createAppModule, PulumiApp, PulumiAppModule } from "@webiny/pulumi";
import { createLambdaRole, getCommonLambdaEnvVariables } from "../lambdaUtils";
import { CoreOutput, VpcConfig } from "~/apps";
import { getAwsAccountId, getAwsRegion } from "../awsUtils";
import { LAMBDA_RUNTIME } from "~/constants";
import { SyncSystemDynamo } from "~/apps/syncSystem/SyncSystemDynamo";

export interface SyncSystemLambdaParams {
    protect: boolean;
    config: Record<string, string>;
}

export type SyncSystemLambda = PulumiAppModule<typeof SyncSystemLambda>;

export const SyncSystemLambda = createAppModule({
    name: "SyncSystemLambda",
    config(app: PulumiApp, params: SyncSystemLambdaParams) {
        const dynamoDbTable = app.getModule(SyncSystemDynamo);

        const policy = createSyncSystemLambdaPolicy(app);
        const role = createLambdaRole(app, {
            name: "sync-system-lambda-role",
            policy: policy.output
        });

        const syncSystemLambda = app.addResource(aws.lambda.Function, {
            name: "sync-system-lambda",
            config: {
                runtime: LAMBDA_RUNTIME,
                handler: "handler.handler",
                role: role.output.arn,
                timeout: 900,
                memorySize: 1024,
                code: new pulumi.asset.AssetArchive({
                    ".": new pulumi.asset.FileArchive(
                        path.join(app.paths.workspace, "transfer/build")
                    )
                }),
                environment: {
                    variables: getCommonLambdaEnvVariables().apply(value => ({
                        ...value,
                        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                    }))
                },
                vpcConfig: app.getModule(VpcConfig).functionVpcConfig
            }
        });
        /**
         * Store some settings in the table.
         */
        app.addResource(aws.dynamodb.TableItem, {
            name: "syncSystemSettings",
            config: {
                tableName: dynamoDbTable.output.arn,
                hashKey: dynamoDbTable.output.hashKey,
                rangeKey: pulumi.output(dynamoDbTable.output.rangeKey).apply(key => key || "SK"),
                item: pulumi.interpolate`{
              ${addTableItems({
                  PK: "syncSystem#SETTINGS",
                  SK: "default",
                  config: params.config
              })}
            }`
            }
        });

        return {
            role,
            policy,
            functions: {
                syncSystem: syncSystemLambda
            }
        };
    }
});

const getTableItemType = (value: unknown) => {
    if (value === null || value === undefined) {
        return "S";
    }
    switch (typeof value) {
        case "string":
            return "S";
        case "number":
            return "N";
        case "object":
            return "M";
        default:
            throw new Error(`Unsupported type: ${typeof value}`);
    }
};

const addTableItems = (items: Record<string, string | number | Record<string, string>>): string => {
    return Object.keys(items)
        .reduce<string[]>((output, key) => {
            const value = items[key];
            output.push(`"${key}": {"${getTableItemType(value)}": "${value}"}`);
            return output;
        }, [])
        .join(",");
};

function createSyncSystemLambdaPolicy(app: PulumiApp) {
    const coreOutput = app.getModule(CoreOutput);
    const awsAccountId = getAwsAccountId(app);
    const awsRegion = getAwsRegion(app);

    return app.addResource(aws.iam.Policy, {
        name: "ApiGraphqlLambdaPolicy",
        config: {
            description: "This policy enables access to Dynamodb, S3, Lambda and Cognito IDP",
            // Core is pulumi.Output, so we need to run apply() to resolve policy based on it
            policy: coreOutput.apply(core => {
                const policy: aws.iam.PolicyDocument = {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Sid: "PermissionForDynamodb",
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
                        },
                        {
                            Sid: "PermissionForS3",
                            Effect: "Allow",
                            Action: [
                                "s3:ListBucket",
                                "s3:GetObjectAcl",
                                "s3:DeleteObject",
                                "s3:PutObjectAcl",
                                "s3:PutObject",
                                "s3:GetObject"
                            ],
                            Resource: [
                                pulumi.interpolate`arn:aws:s3:::${core.fileManagerBucketId}`,
                                pulumi.interpolate`arn:aws:s3:::${core.fileManagerBucketId}/*`
                            ]
                        },
                        {
                            Sid: "PermissionForLambda",
                            Effect: "Allow",
                            Action: ["lambda:InvokeFunction"],
                            Resource: pulumi.interpolate`arn:aws:lambda:${awsRegion}:${awsAccountId}:function:*`
                        }
                    ]
                };

                return policy;
            })
        }
    });
}
