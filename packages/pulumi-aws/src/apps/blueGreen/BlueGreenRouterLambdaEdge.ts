import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb.js";
import { LAMBDA_RUNTIME } from "~/constants.js";
import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from "fs";
import {
    BLUE_GREEN_PARTITION_KEY,
    BLUE_GREEN_ROUTER_TYPE_HEADER,
    BLUE_GREEN_SORT_KEY
} from "./constants.js";

export type BlueGreenRouterLambdaEdge = PulumiAppModule<typeof BlueGreenRouterLambdaEdge>;

interface ICreateFunctionArchiveParams {
    region: string;
    dynamoDbTable: string;
    blueGreenPartitionKey: string;
    blueGreenSortKey: string;
    blueGreenRouterTypeHeader: string;
}

function createFunctionArchive({
    dynamoDbTable,
    region,
    blueGreenPartitionKey,
    blueGreenSortKey,
    blueGreenRouterTypeHeader
}: ICreateFunctionArchiveParams) {
    const handler = readFileSync(__dirname + "/functions/request.js", "utf-8");

    const source = handler
        .replace("{DB_TABLE_NAME}", dynamoDbTable)
        .replace("{DB_TABLE_REGION}", region)
        .replace("{BLUE_GREEN_PARTITION_KEY}", blueGreenPartitionKey)
        .replace("{BLUE_GREEN_SORT_KEY}", blueGreenSortKey)
        .replace("{BLUE_GREEN_ROUTER_TYPE_HEADER}", blueGreenRouterTypeHeader);

    return new pulumi.asset.AssetArchive({
        "index.js": new pulumi.asset.StringAsset(source)
    });
}

export interface IBlueGreenRouterLambdaEdgeConfig {
    region: aws.Provider;
    protect: boolean;
}

export const BlueGreenRouterLambdaEdge = createAppModule({
    name: "BlueGreenRouterLambdaEdge",
    config(app, config: IBlueGreenRouterLambdaEdgeConfig) {
        const dynamoDbTable = app.getModule(BlueGreenRouterDynamoDb);
        const edgeRole = app.addResource(aws.iam.Role, {
            name: "blueGreenRouterEdgeLambdaRole",
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                managedPolicyArns: [aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole],
                assumeRolePolicy: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Action: "sts:AssumeRole",
                            Principal: aws.iam.Principals.LambdaPrincipal,
                            Effect: "Allow"
                        },
                        {
                            Action: "sts:AssumeRole",
                            Principal: aws.iam.Principals.EdgeLambdaPrincipal,
                            Effect: "Allow"
                        }
                    ]
                }
            }
        });

        const edgePolicy = app.addResource(aws.iam.Policy, {
            name: "blueGreenRouterEdgeLambdaPolicy",
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                policy: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Sid: "BlueGreenDynamoDbPolicy",
                            Effect: "Allow",
                            Action: ["dynamodb:GetItem"],
                            Resource: [
                                dynamoDbTable.output.arn.apply(arn => {
                                    return `${arn}`;
                                }),
                                dynamoDbTable.output.arn.apply(arn => {
                                    return `${arn}/*`;
                                })
                            ]
                        }
                    ]
                }
            }
        });

        const edgePolicyAttachment = app.addResource(aws.iam.RolePolicyAttachment, {
            name: "blueGreenRouterEdgeLambdaPolicyAttachment",
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                role: edgeRole.output,
                policyArn: edgePolicy.output.arn
            }
        });

        const edgeLambda = app.addResource(aws.lambda.Function, {
            name: "blue-green-router",
            // With the `retainOnDelete` option set to `true`, the Lambda function will not be deleted when
            // the environment is destroyed. Users need to delete the function manually. We decided to use
            // this option here because it enables us to avoid annoying AWS Lambda function replication
            // errors upon destroying the stack (see https://github.com/pulumi/pulumi-aws/issues/2178).
            opts: {
                provider: config.region,
                protect: config.protect,
                retainOnDelete: true
            },
            config: {
                publish: true,
                runtime: LAMBDA_RUNTIME,
                handler: "index.handler",
                role: edgeRole.output.arn,
                timeout: 5,
                memorySize: 128,
                code: dynamoDbTable.output.name.apply(dynamoDbTable => {
                    return createFunctionArchive({
                        region: Region.USEast1,
                        dynamoDbTable,
                        blueGreenPartitionKey: BLUE_GREEN_PARTITION_KEY,
                        blueGreenSortKey: BLUE_GREEN_SORT_KEY,
                        blueGreenRouterTypeHeader: BLUE_GREEN_ROUTER_TYPE_HEADER
                    });
                })
            },
            meta: {
                canUseVpc: false
            }
        });

        return {
            edgeLambda,
            edgePolicy,
            edgeRole,
            edgePolicyAttachment
        };
    }
});
