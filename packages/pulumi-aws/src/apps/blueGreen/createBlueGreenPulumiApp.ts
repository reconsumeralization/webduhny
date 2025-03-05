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
import { BlueGreenRouterCloudFrontStore } from "./BlueGreenRouterCloudFrontStore.js";
import { BLUE_GREEN_ROUTER_STORE_KEY } from "~/apps/blueGreen/constants.js";

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

            const { cloudFrontStore } = app.addModule(BlueGreenRouterCloudFrontStore, {
                protect,
                region
            });
            /*
            addTableItems({
                table: dynamoDbTable,
                region,
                app,
                partitionKey: BLUE_GREEN_PARTITION_KEY,
                sortKey: BLUE_GREEN_SORT_KEY,
                value: {
                    primary: {
                        apiCloudfrontDomainName: "d23eod0opwn5wj.cloudfront.net",
                        adminCloudfrontDomainName: "d1tfhjdlnuyb16.cloudfront.net",
                        websiteCloudfrontDomainName: "d1252xj1fnqf4t.cloudfront.net",
                        previewCloudfrontDomainName: "d30hx3bilq6uv7.cloudfront.net"
                    },
                    secondary: {
                        apiCloudfrontDomainName: "dbef28872wnk6.cloudfront.net",
                        adminCloudfrontDomainName: "d2nrb5rwmc7p0g.cloudfront.net",
                        websiteCloudfrontDomainName: "d2f0oj3kdszw7y.cloudfront.net",
                        previewCloudfrontDomainName: "d3pd007rivyf6j.cloudfront.net"
                    }
                }
            });
           
            */
            const keyValueStoreResourceKey = app.addResource(aws.cloudfront.KeyvaluestoreKey, {
                name: "blue-green-router-store-key",
                config: {
                    keyValueStoreArn: cloudFrontStore.output.arn,
                    key: BLUE_GREEN_ROUTER_STORE_KEY,
                    value: JSON.stringify({
                        primary: {
                            apiCloudfrontDomainName: "d23eod0opwn5wj.cloudfront.net",
                            adminCloudfrontDomainName: "d1tfhjdlnuyb16.cloudfront.net",
                            websiteCloudfrontDomainName: "d1252xj1fnqf4t.cloudfront.net",
                            previewCloudfrontDomainName: "d30hx3bilq6uv7.cloudfront.net"
                        },
                        secondary: {
                            apiCloudfrontDomainName: "dbef28872wnk6.cloudfront.net",
                            adminCloudfrontDomainName: "d2nrb5rwmc7p0g.cloudfront.net",
                            websiteCloudfrontDomainName: "d2f0oj3kdszw7y.cloudfront.net",
                            previewCloudfrontDomainName: "d3pd007rivyf6j.cloudfront.net"
                        }
                    })
                }
            });

            const apiGateway = app.addModule(BlueGreenRouterApiGateway, {
                protect,
                region
            });

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
            const { cloudFront: previewCloudFront } = addCloudfront({
                type: BlueGreenRouterCloudFrontType.preview,
                map: {
                    distributionDomain: "cloudfrontPreviewDomain",
                    distributionUrl: "cloudfrontPreviewUrl",
                    usedDomain: "previewDomain",
                    usedUrl: "previewUrl"
                }
            });

            tagResources({
                WebAppName: "blueGreenRouter",
                WbyProjectName: getEnvVariableWebinyProjectName(),
                WbyEnvironment: getEnvVariableWebinyEnv()
            });

            return {
                region,
                apiGateway: apiGateway.apiGateway,
                apiGatewayStage: apiGateway.apiStage,
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
                previewCloudFront,
                previewCloudFrontId: previewCloudFront.output.id,
                previewCloudFrontArn: previewCloudFront.output.arn,
                previewCloudFrontDomainName: previewCloudFront.output.domainName,
                //
                cloudFrontStore,
                keyValueStoreResourceKey
            };
        }
    });
}
