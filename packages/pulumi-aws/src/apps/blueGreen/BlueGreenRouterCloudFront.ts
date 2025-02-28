import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { LAMBDA_RUNTIME } from "~/constants";
import { readFileSync } from "fs";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb";
import type { GetCachePolicyResult } from "@pulumi/aws/cloudfront/getCachePolicy";
import type { GetOriginRequestPolicyResult } from "@pulumi/aws/cloudfront/getOriginRequestPolicy";
import { BLUE_GREEN_PARTITION_KEY, BLUE_GREEN_SORT_KEY } from "./constants.js";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";

export type BlueGreenRouterCloudFront = PulumiAppModule<typeof BlueGreenRouterCloudFront>;

export interface IBlueGreenRouterCloudFrontConfig {
    region: aws.Provider;
    protect: boolean;
    cachePolicyId: GetCachePolicyResult;
    originRequestPolicyId: GetOriginRequestPolicyResult;
}

interface ICreateFunctionArchiveParams {
    region: string;
    dynamoDbTable: string;
    blueGreenPartitionKey: string;
    blueGreenSortKey: string;
}

function createFunctionArchive({
    dynamoDbTable,
    region,
    blueGreenPartitionKey,
    blueGreenSortKey
}: ICreateFunctionArchiveParams) {
    const handler = readFileSync(__dirname + "/functions/request.js", "utf-8");

    const source = handler
        .replace("{DB_TABLE_NAME}", dynamoDbTable)
        .replace("{DB_TABLE_REGION}", region)
        .replace("{BLUE_GREEN_PARTITION_KEY}", blueGreenPartitionKey)
        .replace("{BLUE_GREEN_SORT_KEY}", blueGreenSortKey);

    return new pulumi.asset.AssetArchive({
        "index.js": new pulumi.asset.StringAsset(source)
    });
}

export const BlueGreenRouterCloudFront = createAppModule({
    name: "BlueGreenRouterCloudFront",
    config(app, config: IBlueGreenRouterCloudFrontConfig) {
        const dynamoDbTable = app.getModule(BlueGreenRouterDynamoDb);
        const api = app.getModule(BlueGreenRouterApiGateway);

        const edgeRole = app.addResource(aws.iam.Role, {
            name: "blueGreenRouterEdgeLambdaRole",
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
            },
            opts: {
                provider: config.region,
                protect: config.protect
            }
        });

        const edgePolicy = app.addResource(aws.iam.Policy, {
            name: "blueGreenRouterEdgeLambdaPolicy",
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
            },
            opts: {
                provider: config.region,
                protect: config.protect
            }
        });

        const edgePolicyAttachment = app.addResource(aws.iam.RolePolicyAttachment, {
            name: "blueGreenRouterEdgeLambdaPolicyAttachment",
            config: {
                role: edgeRole.output,
                policyArn: edgePolicy.output.arn
            },
            opts: {
                provider: config.region,
                protect: config.protect
            }
        });

        const edgeLambda = app.addResource(aws.lambda.Function, {
            name: "blue-green-router",
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
                        blueGreenSortKey: BLUE_GREEN_SORT_KEY
                    });
                })
            },
            // With the `retainOnDelete` option set to `true`, the Lambda function will not be deleted when
            // the environment is destroyed. Users need to delete the function manually. We decided to use
            // this option here because it enables us to avoid annoying AWS Lambda function replication
            // errors upon destroying the stack (see https://github.com/pulumi/pulumi-aws/issues/2178).
            opts: {
                provider: config.region,
                protect: config.protect,
                retainOnDelete: true
            },
            meta: {
                canUseVpc: false
            }
        });

        const cloudFront = app.addResource(aws.cloudfront.Distribution, {
            name: "blue-green-router-cloudfront",
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                enabled: true,
                priceClass: "PriceClass_100",
                origins: [
                    {
                        domainName: api.apiGateway.output.apiEndpoint.apply(url =>
                            url.replace("https://", "")
                        ),
                        originId: "primarySystemCloudFront",
                        customOriginConfig: {
                            originProtocolPolicy: "https-only",
                            httpPort: 80,
                            httpsPort: 443,
                            originSslProtocols: ["TLSv1.2"]
                        }
                    }
                ],
                defaultCacheBehavior: {
                    targetOriginId: "primarySystemCloudFront",
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
                    cachedMethods: ["GET", "HEAD"],
                    cachePolicyId: config.cachePolicyId.id,
                    originRequestPolicyId: config.originRequestPolicyId.id,
                    lambdaFunctionAssociations: [
                        {
                            eventType: "origin-request",
                            lambdaArn: edgeLambda.output.qualifiedArn
                        }
                    ]
                },
                restrictions: {
                    geoRestriction: {
                        restrictionType: "none"
                    }
                },
                viewerCertificate: {
                    cloudfrontDefaultCertificate: true
                }
            }
        });

        return {
            cloudFront,
            edgeLambda,
            edgePolicy,
            edgePolicyAttachment,
            edgeRole
        };
    }
});
