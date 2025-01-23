import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { getLumigoAutoTraceTagForLongLivedEnv } from "../utils";

interface VerifyLicenseParams {
    env: Record<string, any>;
    dbTable: aws.dynamodb.Table;
}

export default class GetProjectLicense {
    function: aws.lambda.Function;
    functionUrl: aws.lambda.FunctionUrl;

    constructor({ env, dbTable }: VerifyLicenseParams) {
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
    }
}
