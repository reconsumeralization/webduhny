import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { LAMBDA_RUNTIME } from "~/constants";
import { readFileSync } from "fs";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb";

export type BlueGreenRouterCloudFront = PulumiAppModule<typeof BlueGreenRouterCloudFront>;

export interface IBlueGreenRouterCloudFrontConfig {
    region: aws.Provider;
}

interface ICreateFunctionArchiveParams {
    region: string;
    dynamoDbTable: string;
}

function createFunctionArchive({ dynamoDbTable, region }: ICreateFunctionArchiveParams) {
    const handler = readFileSync(__dirname + "/functions/request.js", "utf-8");

    const source = handler
        .replace("{DB_TABLE_NAME}", dynamoDbTable)
        .replace("{DB_TABLE_REGION}", region);

    return new pulumi.asset.AssetArchive({
        "index.js": new pulumi.asset.StringAsset(source)
    });
}

export const BlueGreenRouterCloudFront = createAppModule({
    name: "BlueGreenRouterCloudFront",
    config(app, config: IBlueGreenRouterCloudFrontConfig) {
        const dynamoDbTable = app.getModule(BlueGreenRouterDynamoDb);

        const edgeRole = app.addResource(aws.iam.Role, {
            name: "blueGreenRouterEdgeLambdaRole",
            config: {
                assumeRolePolicy: {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Action: "sts:AssumeRole",
                            Effect: "Allow",
                            Principal: {
                                Service: "lambda.amazonaws.com"
                            }
                        }
                    ]
                }
            },
            opts: {
                provider: config.region
            }
        });

        const edgePolicy = app.addResource(aws.iam.RolePolicyAttachment, {
            name: "blueGreenRouterEdgeLambdaPolicy",
            config: {
                role: edgeRole.output,
                policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole
            },
            opts: {
                provider: config.region
            }
        });

        const edgeLambda = app.addResource(aws.lambda.Function, {
            name: "blueGreenRouterEdgeLambda",
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
                        dynamoDbTable
                    });
                })
            },
            // With the `retainOnDelete` option set to `true`, the Lambda function will not be deleted when
            // the environment is destroyed. Users need to delete the function manually. We decided to use
            // this option here because it enables us to avoid annoying AWS Lambda function replication
            // errors upon destroying the stack (see https://github.com/pulumi/pulumi-aws/issues/2178).
            opts: {
                provider: config.region,
                retainOnDelete: true
            },
            meta: {
                canUseVpc: false
            }
        });

        // CloudFront Distribution
        const cloudFront = app.addResource(aws.cloudfront.Distribution, {
            name: "blueGreenRouterCloudFront",
            opts: {
                provider: config.region
            },
            config: {
                enabled: true,
                origins: [
                    {
                        domainName: "placeholder-for-primary-system.example.com",
                        originId: "primarySystemCloudFront",
                        customOriginConfig: {
                            httpPort: 80,
                            httpsPort: 443,
                            originProtocolPolicy: "https-only",
                            originSslProtocols: ["TLSv1.2"]
                        }
                    }
                ],
                defaultCacheBehavior: {
                    targetOriginId: "primarySystemCloudFront",
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
                    cachedMethods: [],
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
            edgeRole
        };
    }
});
