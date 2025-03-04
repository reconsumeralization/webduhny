import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import type { PulumiAppParam } from "@webiny/pulumi";
import { createPulumiApp } from "@webiny/pulumi";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants.js";
import {
    BlueGreenRouterCloudFront,
    BlueGreenRouterCloudFrontType
} from "./BlueGreenRouterCloudFront.js";
import { createCloudFrontDefaultCacheBehaviorPolicies } from "./createCloudFrontDefaultCacheBehaviorPolicies.js";
import { tagResources } from "~/utils/tagResources.js";
import { getEnvVariableWebinyProjectName } from "~/env/projectName.js";
import { getEnvVariableWebinyEnv } from "~/env/env.js";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";
import { BlueGreenRouterLambdaEdge } from "./BlueGreenRouterLambdaEdge.js";
import { BlueGreenRouterCloudFrontStore } from "./BlueGreenRouterCloudFrontStore.js";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb.js";
import { addTableItems } from "./addTableItems.js";
import { BLUE_GREEN_PARTITION_KEY, BLUE_GREEN_SORT_KEY } from "./constants.js";

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

            addTableItems({
                table: dynamoDbTable,
                region,
                app,
                partitionKey: BLUE_GREEN_PARTITION_KEY,
                sortKey: BLUE_GREEN_SORT_KEY,
                value: {
                    primary: {
                        apiCloudfrontDomainName: "d5afe46rtyru0.cloudfront.net",
                        adminCloudfrontDomainName: "d5afe46rtyru0admin.cloudfront.net",
                        websiteCloudfrontDomainName: "d5afe46rtyru0website.cloudfront.net"
                    },
                    secondary: {
                        apiCloudfrontDomainName: "d5afe46rtyru0secondary.cloudfront.net",
                        adminCloudfrontDomainName: "d5afe46rtyru0adminsecondary.cloudfront.net",
                        websiteCloudfrontDomainName: "d5afe46rtyru0websitesecondary.cloudfront.net"
                    }
                }
            });

            app.addModule(BlueGreenRouterCloudFrontStore, {
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

            const { addCloudfront } = app.addModule(BlueGreenRouterCloudFront, {
                protect,
                region,
                cachePolicyId: disableCachingCachePolicyId,
                originRequestPolicyId: forwardEverythingOriginRequestPolicyId
            });

            const { cloudFront: apiCloudFront } = addCloudfront({
                type: BlueGreenRouterCloudFrontType.api,
                map: {
                    distributionDomain: "cloudfrontApiDomain",
                    distributionUrl: "cloudfrontApiUrl",
                    usedDomain: "apiDomain",
                    usedUrl: "apiUrl"
                }
            });

            const { cloudFront: adminCloudFront } = addCloudfront({
                type: BlueGreenRouterCloudFrontType.admin,

                map: {
                    distributionDomain: "cloudfrontAppDomain",
                    distributionUrl: "cloudfrontAppUrl",
                    usedDomain: "appDomain",
                    usedUrl: "appUrl"
                }
            });
            const { cloudFront: websiteCloudFront } = addCloudfront({
                type: BlueGreenRouterCloudFrontType.website,
                map: {
                    distributionDomain: "cloudfrontWebsiteDomain",
                    distributionUrl: "cloudfrontWebsiteUrl",
                    usedDomain: "websiteDomain",
                    usedUrl: "websiteUrl"
                }
            });
            const { cloudFront: deliveryCloudFront } = addCloudfront({
                type: BlueGreenRouterCloudFrontType.delivery,
                map: {
                    distributionDomain: "cloudfrontDeliveryDomain",
                    distributionUrl: "cloudfrontDeliveryUrl",
                    usedDomain: "deliveryDomain",
                    usedUrl: "deliveryUrl"
                }
            });

            tagResources({
                WebAppName: "blueGreenRouter",
                WbyProjectName: getEnvVariableWebinyProjectName(),
                WbyEnvironment: getEnvVariableWebinyEnv()
            });

            return {
                router: {
                    region,
                    // dynamoDbTable,
                    apiGateway: apiGateway.apiGateway,
                    apiGatewayStage: apiGateway.apiStage,
                    // dynamoDbTableArn: dynamoDbTable.output.arn,
                    // dynamoDbTableHashKey: dynamoDbTable.output.hashKey,
                    // dynamoDbTableRangeKey: dynamoDbTable.output.rangeKey,
                    /**
                     * CloudFront distributions.
                     */
                    apiCloudFront,
                    apiCloudFrontId: apiCloudFront.output.id,
                    apiCloudFrontArn: apiCloudFront.output.arn,
                    apiCloudFrontDomainName: apiCloudFront.output.domainName,
                    adminCloudFront,
                    adminCloudFrontId: adminCloudFront.output.id,
                    adminCloudFrontArn: adminCloudFront.output.arn,
                    adminCloudFrontDomainName: adminCloudFront.output.domainName,
                    websiteCloudFront,
                    websiteCloudFrontId: websiteCloudFront.output.id,
                    websiteCloudFrontArn: websiteCloudFront.output.arn,
                    websiteCloudFrontDomainName: websiteCloudFront.output.domainName,
                    deliveryCloudFront,
                    deliveryCloudFrontId: deliveryCloudFront.output.id,
                    deliveryCloudFrontArn: deliveryCloudFront.output.arn,
                    deliveryCloudFrontDomainName: deliveryCloudFront.output.domainName,
                    //
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
