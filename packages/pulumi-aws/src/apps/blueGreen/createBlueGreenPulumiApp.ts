import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import type { PulumiAppParam } from "@webiny/pulumi";
import { createPulumiApp } from "@webiny/pulumi";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants.js";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb.js";
import { BlueGreenRouterCloudFront } from "./BlueGreenRouterCloudFront.js";
import { createCloudFrontDefaultCacheBehaviorPolicies } from "./createCloudFrontDefaultCacheBehaviorPolicies.js";
import { tagResources } from "~/utils/tagResources.js";
import { getEnvVariableWebinyProjectName } from "~/env/projectName.js";
import { getEnvVariableWebinyEnv } from "~/env/env.js";
import { addDomainsUrlsOutputs } from "~/utils/addDomainsUrlsOutputs.js";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";
import { BlueGreenRouterLambdaEdge } from "./BlueGreenRouterLambdaEdge.js";

export type BlueGreenRouterPulumiApp = ReturnType<typeof createBlueGreenPulumiApp>;

export interface ElasticsearchConfig {
    domainName: string;
    indexPrefix: string;
    sharedIndexes: boolean;
}

export interface OpenSearchConfig {
    domainName: string;
    indexPrefix: string;
    sharedIndexes: boolean;
}

export interface CreateBlueGreenPulumiAppParams {
    /**
     * Secures against deleting database by accident.
     * By default enabled in production environments.
     */
    protect?: PulumiAppParam<boolean>;

    /**
     * Enables ElasticSearch infrastructure.
     * Note that it requires also changes in application code.
     */
    elasticSearch?: PulumiAppParam<boolean | Partial<ElasticsearchConfig>>;

    /**
     * Enables OpenSearch infrastructure.
     * Note that it requires also changes in application code.
     */
    openSearch?: PulumiAppParam<boolean | Partial<OpenSearchConfig>>;

    /**
     * Enables VPC for the application.
     * By default enabled in production environments.
     */
    vpc?: PulumiAppParam<boolean>;

    /**
     * Provides a way to adjust existing Pulumi code (cloud infrastructure resources)
     * or add additional ones into the mix.
     */
    pulumi?: (app: BlueGreenRouterPulumiApp) => void | Promise<void>;

    /**
     * Prefixes names of all Pulumi cloud infrastructure resource with given prefix.
     */
    pulumiResourceNamePrefix?: PulumiAppParam<string>;

    /**
     * Treats provided environments as production environments, which
     * are deployed in production deployment mode.
     * https://www.webiny.com/docs/architecture/deployment-modes/production
     */
    productionEnvironments?: PulumiAppParam<string[]>;
}

export function createBlueGreenPulumiApp(projectAppParams: CreateBlueGreenPulumiAppParams = {}) {
    return createPulumiApp({
        name: "blueGreen",
        path: "apps/blueGreen",
        config: projectAppParams,
        program: async app => {
            const productionEnvironments =
                app.params.create.productionEnvironments || DEFAULT_PROD_ENV_NAMES;
            const isProduction = productionEnvironments.includes(app.params.run.env);
            const protect = app.getParam(projectAppParams.protect) ?? isProduction;

            const region = new aws.Provider(Region.USEast1, {
                region: Region.USEast1
            });

            /**
             * Policies required for default Cache Behavior in CloudFront.
             * We need to do this outside the module creation because it is async.
             */
            const { forwardEverythingOriginRequestPolicyId, disableCachingCachePolicyId } =
                await createCloudFrontDefaultCacheBehaviorPolicies();

            const dynamoDbTable = app.addModule(BlueGreenRouterDynamoDb, {
                protect,
                region
            });
            const apiGateway = app.addModule(BlueGreenRouterApiGateway, {
                protect,
                region
            });

            const { edgeLambda, edgePolicy, edgePolicyAttachment, edgeRole } = app.addModule(
                BlueGreenRouterLambdaEdge,
                {
                    protect,
                    region
                }
            );

            const { cloudFront } = app.addModule(BlueGreenRouterCloudFront, {
                protect,
                region,
                cachePolicyId: disableCachingCachePolicyId,
                originRequestPolicyId: forwardEverythingOriginRequestPolicyId
            });

            // TODO - have different output for Blue / Green
            app.addHandler(() => {
                addDomainsUrlsOutputs({
                    app,
                    cloudfrontDistribution: cloudFront,
                    map: {
                        distributionDomain: "cloudfrontApiDomain",
                        distributionUrl: "cloudfrontApiUrl",
                        usedDomain: "apiDomain",
                        usedUrl: "apiUrl"
                    }
                });
            });

            tagResources({
                WbyProjectName: getEnvVariableWebinyProjectName(),
                WbyEnvironment: getEnvVariableWebinyEnv()
            });

            return {
                router: {
                    region,
                    dynamoDbTable,
                    apiGateway: apiGateway.apiGateway,
                    apiGatewayStage: apiGateway.apiStage,
                    dynamoDbTableArn: dynamoDbTable.output.arn,
                    dynamoDbTableHashKey: dynamoDbTable.output.hashKey,
                    dynamoDbTableRangeKey: dynamoDbTable.output.rangeKey,
                    cloudFront: cloudFront,
                    cloudfrontId: cloudFront.output.id,
                    cloudfrontArn: cloudFront.output.arn,
                    cloudfrontDomainName: cloudFront.output.domainName,
                    edgeLambda,
                    edgeLambdaArn: edgeLambda.output.arn,
                    edgeLambdaQualifiedArn: edgeLambda.output.qualifiedArn,
                    edgePolicy,
                    edgeRole,
                    edgePolicyAttachment
                }
            };
        }
    });
}
