import * as aws from "@pulumi/aws";
import { createAppModule, PulumiApp, PulumiAppModule } from "@webiny/pulumi";

import { ApiGateway } from "./ApiGateway";
import * as pulumi from "@pulumi/pulumi";
import { CoreOutput, VpcConfig } from "~/apps";
import { createLambdaRole, getCommonLambdaEnvVariables } from "~/apps/lambdaUtils";
import { LAMBDA_RUNTIME } from "~/constants";
import path from "path";
import { getAwsAccountId, getAwsRegion } from "~/apps/awsUtils";

export type ApiCloudfront = PulumiAppModule<typeof ApiCloudfront>;

export const ApiCloudfront = createAppModule({
    name: "ApiCloudfront",
    config(app: PulumiApp) {
        const core = app.getModule(CoreOutput);

        const policy = createGraphqlLambdaPolicy(app);
        const role = createLambdaRole(app, {
            name: "api-lambda-role",
            policy: policy.output
        });
        policy.config.policy;

        const graphql = app.addResource(aws.lambda.Function, {
            name: "graphql",
            config: {
                runtime: LAMBDA_RUNTIME,
                handler: "handler.handler",
                role: role.output.arn,
                timeout: 30,
                memorySize: 1024,
                code: new pulumi.asset.AssetArchive({
                    ".": new pulumi.asset.FileArchive(
                        path.join(app.paths.workspace, "graphql/build")
                    )
                }),
                environment: {
                    variables: getCommonLambdaEnvVariables().apply(value => ({
                        ...value,
                        ...params.env,
                        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                    }))
                },
                vpcConfig: app.getModule(VpcConfig).functionVpcConfig
            }
        });

        const role = new aws.iam.Role("wcp-get-project-license-role", {
            assumeRolePolicy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "sts:AssumeRole",
                        Principal: {
                            Service: "lambda.amazonaws.com"
                        },
                        Effect: "Allow"
                    }
                ]
            },
            inlinePolicies: [
                {
                    name: "wcp-get-project-license-role-policy",
                    policy: dbTable.arn.apply(arn =>
                        JSON.stringify({
                            Version: "2012-10-17",
                            Statement: [
                                {
                                    Sid: "PermissionForDynamodb",
                                    Effect: "Allow",
                                    Action: ["dynamodb:GetItem", "dynamodb:Query"],
                                    Resource: [arn, `${arn}/*`]
                                }
                            ]
                        })
                    )
                }
            ]
        });

        new aws.iam.RolePolicyAttachment("wcp-get-project-license-execution", {
            role,
            policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole
        });

        this.function = new aws.lambda.Function("wcp-get-project-license", {
            runtime: aws.lambda.Runtime.NodeJS16dX,
            handler: "handler.handler",
            description: "WCP - Get Project License",
            role: role.arn,
            timeout: 30,
            memorySize: 512,
            code: new pulumi.asset.AssetArchive({
                ".": new pulumi.asset.FileArchive("../build/getProjectLicense")
            }),
            environment: {
                variables: {
                    ...env,
                    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                }
            },
            tags: getLumigoAutoTraceTagForLongLivedEnv()
        });

        this.functionUrl = new aws.lambda.FunctionUrl("wcp-get-project-license-url", {
            functionName: this.function.name,
            authorizationType: "NONE"
        });

        //
        // const gateway = app.getModule(ApiGateway);
        //
        // const cookies = {
        //     forward: "whitelist",
        //     whitelistedNames: ["wby-id-token"]
        // };
        //
        // const forwardHeaders = ["Origin", "Accept", "Accept-Language"];
        //
        // return app.addResource(aws.cloudfront.Distribution, {
        //     name: "api-cloudfront",
        //     config: {
        //         waitForDeployment: false,
        //         isIpv6Enabled: true,
        //         enabled: true,
        //         defaultCacheBehavior: {
        //             compress: true,
        //             allowedMethods: ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
        //             cachedMethods: ["GET", "HEAD", "OPTIONS"],
        //             forwardedValues: {
        //                 cookies,
        //                 headers: forwardHeaders,
        //                 queryString: true
        //             },
        //             // MinTTL <= DefaultTTL <= MaxTTL
        //             minTtl: 0,
        //             defaultTtl: 0,
        //             maxTtl: 86400,
        //             targetOriginId: gateway.api.output.name,
        //             viewerProtocolPolicy: "allow-all"
        //         },
        //         orderedCacheBehaviors: [
        //             {
        //                 compress: true,
        //                 allowedMethods: [
        //                     "GET",
        //                     "HEAD",
        //                     "OPTIONS",
        //                     "PUT",
        //                     "POST",
        //                     "PATCH",
        //                     "DELETE"
        //                 ],
        //                 cachedMethods: ["GET", "HEAD", "OPTIONS"],
        //                 forwardedValues: {
        //                     cookies: {
        //                         forward: "none"
        //                     },
        //                     headers: ["Accept", "Accept-Language"],
        //                     queryString: true
        //                 },
        //                 pathPattern: "/cms*",
        //                 viewerProtocolPolicy: "allow-all",
        //                 targetOriginId: gateway.api.output.name
        //             },
        //             {
        //                 allowedMethods: ["HEAD", "GET", "OPTIONS"],
        //                 cachedMethods: ["HEAD", "GET", "OPTIONS"],
        //                 forwardedValues: {
        //                     cookies: {
        //                         forward: "none"
        //                     },
        //                     headers: forwardHeaders,
        //                     queryString: true
        //                 },
        //                 // MinTTL <= DefaultTTL <= MaxTTL
        //                 minTtl: 0,
        //                 defaultTtl: 0,
        //                 maxTtl: 2592000,
        //                 pathPattern: "/files/*",
        //                 viewerProtocolPolicy: "allow-all",
        //                 targetOriginId: gateway.api.output.name
        //             },
        //             {
        //                 allowedMethods: ["HEAD", "GET", "OPTIONS"],
        //                 cachedMethods: ["HEAD", "GET", "OPTIONS"],
        //                 forwardedValues: {
        //                     cookies: cookies,
        //                     headers: forwardHeaders,
        //                     queryString: true
        //                 },
        //                 // MinTTL <= DefaultTTL <= MaxTTL
        //                 minTtl: 0,
        //                 defaultTtl: 0,
        //                 maxTtl: 2592000,
        //                 pathPattern: "/private/*",
        //                 viewerProtocolPolicy: "allow-all",
        //                 targetOriginId: gateway.api.output.name
        //             }
        //         ],
        //         origins: [
        //             {
        //                 domainName: gateway.stage.output.invokeUrl.apply(
        //                     (url: string) => new URL(url).hostname
        //                 ),
        //                 originPath: gateway.stage.output.invokeUrl.apply(
        //                     (url: string) => new URL(url).pathname
        //                 ),
        //                 originId: gateway.api.output.name,
        //                 customOriginConfig: {
        //                     httpPort: 80,
        //                     httpsPort: 443,
        //                     originProtocolPolicy: "https-only",
        //                     originSslProtocols: ["TLSv1.2"]
        //                 }
        //             }
        //         ],
        //         restrictions: {
        //             geoRestriction: {
        //                 restrictionType: "none"
        //             }
        //         },
        //         viewerCertificate: {
        //             cloudfrontDefaultCertificate: true
        //         }
        //     },
        //     opts: {
        //         // We are ignoring changes to the "staging" property. This is because of the following.
        //         // With the 5.41.0 release of Webiny, we also upgraded Pulumi to v6. This introduced a change
        //         // with how Cloudfront distributions are deployed, where Pulumi now also controls the new
        //         // `staging` property.
        //         // If not set, Pulumi will default it to `false`. Which is fine, but, the problem is
        //         // that, because this property did not exist before, it will always be considered as a change
        //         // upon deployment.
        //         // We might think this is fine, but, the problem is that a change in this property causes
        //         // a full replacement of the Cloudfront distribution, which is not acceptable. Especially
        //         // if a custom domain has already been associated with the distribution. This then would
        //         // require the user to disassociate the domain, wait for the distribution to be replaced,
        //         // and then re-associate the domain. This is not a good experience.
        //         ignoreChanges: ["staging"]
        //     }
        // });
    }
});

function createGraphqlLambdaPolicy(app: PulumiApp) {
    const coreOutput = app.getModule(CoreOutput);

    return app.addResource(aws.iam.Policy, {
        name: "AdminServerLambdaPolicy",
        config: {
            description: "This policy enables access to DynamoDB and S3.",
            // Core is pulumi.Output, so we need to run apply() to resolve policy based on it
            policy: coreOutput.apply(core => {
                const policy: aws.iam.PolicyDocument = {
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Sid: "PermissionForDynamodb",
                            Effect: "Allow",
                            Action: ["dynamodb:Query"],
                            Resource: [
                                `${core.primaryDynamodbTableArn}`,
                                `${core.primaryDynamodbTableArn}/*`,
                                `${core.logDynamodbTableArn}`,
                                `${core.logDynamodbTableArn}/*`,
                                // Attach permissions for elastic search dynamo as well (if ES is enabled).
                                ...(core.elasticsearchDynamodbTableArn
                                    ? [
                                          `${core.elasticsearchDynamodbTableArn}`,
                                          `${core.elasticsearchDynamodbTableArn}/*`
                                      ]
                                    : [])
                            ]
                        },
                        {
                            Sid: "PermissionForS3",
                            Effect: "Allow",
                            Action: ["s3:GetObject"],
                            Resource: [
                                pulumi.interpolate`arn:aws:s3:::${core.fileManagerBucketId}`,
                                pulumi.interpolate`arn:aws:s3:::${core.fileManagerBucketId}/*`
                            ]
                        }
                    ]
                };

                return policy;
            })
        }
    });
}
