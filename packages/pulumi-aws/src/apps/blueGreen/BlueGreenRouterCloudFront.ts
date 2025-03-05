import * as aws from "@pulumi/aws";
import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import type { GetCachePolicyResult } from "@pulumi/aws/cloudfront/getCachePolicy";
import type { GetOriginRequestPolicyResult } from "@pulumi/aws/cloudfront/getOriginRequestPolicy";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";
import { BLUE_GREEN_ROUTER_STORE_KEY } from "./constants.js";
import { addDomainsUrlsOutputs } from "~/utils/addDomainsUrlsOutputs.js";
import { buildRequestFunction } from "./functions/buildRequestFunction.js";
import { BlueGreenRouterCloudFrontStore } from "~/apps/blueGreen/BlueGreenRouterCloudFrontStore.js";

export type BlueGreenRouterCloudFront = PulumiAppModule<typeof BlueGreenRouterCloudFront>;

export enum BlueGreenRouterCloudFrontType {
    api = "api",
    admin = "admin",
    website = "website",
    preview = "preview"
}

export interface IBlueGreenRouterCloudFrontConfig {
    region: aws.Provider;
    protect: boolean;
    cachePolicyId: GetCachePolicyResult;
    originRequestPolicyId: GetOriginRequestPolicyResult;
}

export interface IAddCloudFrontParams {
    type: BlueGreenRouterCloudFrontType;
    map: {
        distributionDomain: string;
        distributionUrl: string;
        usedDomain: string;
        usedUrl: string;
    };
}

export const BlueGreenRouterCloudFront = createAppModule({
    name: "BlueGreenRouterCloudFront",
    config(app, config: IBlueGreenRouterCloudFrontConfig) {
        const api = app.getModule(BlueGreenRouterApiGateway);

        const store = app.getModule(BlueGreenRouterCloudFrontStore);

        const addCloudfront = (params: IAddCloudFrontParams) => {
            /**
             * Create a new CloudFront function that will be used to route the incoming requests to the correct CloudFront distribution.
             */
            const cloudFrontFunction = app.addResource(aws.cloudfront.Function, {
                name: `blue-green-router-${params.type}-viewer-request`,
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
                            type: params.type
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
                name: `blue-green-router-${params.type}-cloudfront`,
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
                        allowedMethods: [
                            "GET",
                            "HEAD",
                            "POST",
                            "PUT",
                            "PATCH",
                            "OPTIONS",
                            "DELETE"
                        ],
                        cachedMethods: ["GET", "HEAD"],
                        cachePolicyId: config.cachePolicyId.id,
                        originRequestPolicyId: config.originRequestPolicyId.id,
                        functionAssociations: [
                            {
                                eventType: "viewer-request",
                                functionArn: cloudFrontFunction.output.arn
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

            app.addHandler(() => {
                addDomainsUrlsOutputs({
                    app,
                    cloudfrontDistribution: cloudFront,
                    map: params.map
                });
            });

            return {
                cloudFront,
                cloudFrontFunction
            };
        };

        return {
            addCloudfront
        };
    }
});
