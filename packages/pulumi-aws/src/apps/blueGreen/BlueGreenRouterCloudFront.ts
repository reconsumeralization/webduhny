import * as aws from "@pulumi/aws";
import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import type { GetCachePolicyResult } from "@pulumi/aws/cloudfront/getCachePolicy";
import type { GetOriginRequestPolicyResult } from "@pulumi/aws/cloudfront/getOriginRequestPolicy";
import { getCloudFrontConfig } from "./cloudfront/cloudFrontConfig.js";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";
import { BlueGreenRouterCloudFrontStore } from "./BlueGreenRouterCloudFrontStore.js";
import { buildRequestFunction } from "./functions/buildRequestFunction.js";
import {
    BLUE_GREEN_ALLOWED_METHODS,
    BLUE_GREEN_CACHED_METHODS,
    BLUE_GREEN_ROUTER_HEADER,
    BLUE_GREEN_ROUTER_STORE_KEY
} from "./constants.js";
import type { IBlueGreenDomains, IBlueGreenSources } from "./types.js";
import { createCloudFrontFunctionDomainMap } from "./cloudfront/createCloudFrontFunctionDomainMap.js";
import { addDomainsUrlsOutputs } from "~/utils/addDomainsUrlsOutputs.js";

export type BlueGreenRouterCloudFront = PulumiAppModule<typeof BlueGreenRouterCloudFront>;

export interface IBlueGreenRouterCloudFrontConfig {
    region: aws.Provider;
    protect: boolean;
    domains: IBlueGreenDomains;
    sources: IBlueGreenSources;
    cachePolicyId: GetCachePolicyResult;
    originRequestPolicyId: GetOriginRequestPolicyResult;
}

export const BlueGreenRouterCloudFront = createAppModule({
    name: "BlueGreenRouterCloudFront",
    config(app, config: IBlueGreenRouterCloudFrontConfig) {
        const api = app.getModule(BlueGreenRouterApiGateway);

        const store = app.getModule(BlueGreenRouterCloudFrontStore);

        const { origins, orderedCacheBehaviors } = getCloudFrontConfig(config);
        const domains = createCloudFrontFunctionDomainMap({
            domains: config.domains,
            sources: config.sources
        });

        /**
         * Create a new CloudFront function that will be used to route the incoming requests to the correct CloudFront distribution.
         */
        const cloudFrontFunction = app.addResource(aws.cloudfront.Function, {
            name: `blue-green-router-viewer-request`,
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                runtime: "cloudfront-js-2.0",
                publish: true,
                code: store.cloudFrontStore.output.arn.apply(arn => {
                    /**
                     * Unfortunately this is the only way to get the ID of the store.
                     * It is a UUID value.
                     */
                    const id = arn.split("/").pop() as string;
                    return buildRequestFunction({
                        storeId: id,
                        storeKey: BLUE_GREEN_ROUTER_STORE_KEY,
                        headerName: BLUE_GREEN_ROUTER_HEADER,
                        domains
                    });
                }),
                keyValueStoreAssociations: store.cloudFrontStore.output.arn.apply(arn => {
                    return [arn];
                })
            }
        });
        /**
         * Create a CloudFront with attached function.
         */
        const cloudFront = app.addResource(aws.cloudfront.Distribution, {
            name: `blue-green-router-cloudfront`,
            opts: {
                provider: config.region,
                protect: config.protect
            },
            config: {
                enabled: true,
                priceClass: "PriceClass_100",
                origins: [
                    /**
                     * A default origin that will be used in case of no match.
                     */
                    {
                        domainName: api.apiGateway.output.apiEndpoint.apply(url =>
                            url.replace("https://", "")
                        ),
                        originId: "blackHoleSystemCloudFront",
                        customOriginConfig: {
                            originProtocolPolicy: "https-only",
                            httpPort: 80,
                            httpsPort: 443,
                            originSslProtocols: ["TLSv1.2"]
                        }
                    },
                    /**
                     * Dynamic Origins.
                     */
                    ...origins
                ],
                defaultCacheBehavior: {
                    targetOriginId: `blackHoleSystemCloudFront`,
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: BLUE_GREEN_ALLOWED_METHODS,
                    cachedMethods: BLUE_GREEN_CACHED_METHODS,
                    cachePolicyId: config.cachePolicyId.id,
                    originRequestPolicyId: config.originRequestPolicyId.id,
                    // forwardedValues: {
                    //     queryString: true,
                    //     cookies: {
                    //         forward: "all"
                    //     },
                    //     headers: [BLUE_GREEN_ROUTER_HEADER]
                    // },
                    functionAssociations: [
                        {
                            eventType: "viewer-request",
                            functionArn: cloudFrontFunction.output.arn
                        }
                    ]
                },
                orderedCacheBehaviors,
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

        app.addHandler(() => {
            addDomainsUrlsOutputs({
                app,
                cloudfrontDistribution: cloudFront,
                map: {
                    distributionDomain: "distributionDomain",
                    distributionUrl: "distributionUrl",
                    usedDomain: "usedDomain",
                    usedUrl: "usedUrl"
                }
            });
        });

        return {
            cloudFront,
            cloudFrontFunction
        };
    }
});
