import type inputs from "@pulumi/aws/types/input";
import type { IBlueGreenDomains } from "../types.js";
import { createOriginId } from "./createOriginId.js";
import { BLUE_GREEN_ALLOWED_METHODS, BLUE_GREEN_CACHED_METHODS } from "../constants.js";
import { GetCachePolicyResult } from "@pulumi/aws/cloudfront/getCachePolicy.js";
import { GetOriginRequestPolicyResult } from "@pulumi/aws/cloudfront/getOriginRequestPolicy.js";

export interface ICreateOriginsParams {
    domains: IBlueGreenDomains;
}

const createOrigins = (params: ICreateOriginsParams) => {
    const { domains } = params;
    return domains.reduce<inputs.cloudfront.DistributionOrigin[]>((collection, domain) => {
        for (const type in domain.domains) {
            const originId = createOriginId({
                type,
                name: domain.name
            });
            const domainName = domain.domains[type as keyof typeof domain.domains];
            if (!domainName) {
                continue;
            }
            collection.push({
                domainName,
                originId,
                customOriginConfig: {
                    originProtocolPolicy: "https-only",
                    httpPort: 80,
                    httpsPort: 443,
                    originSslProtocols: ["TLSv1.2"]
                }
            });
        }

        return collection;
    }, []);
};

export interface ICreateOrderedCacheBehaviorsParams {
    domains: IBlueGreenDomains;
    cachePolicyId: GetCachePolicyResult;
    originRequestPolicyId: GetOriginRequestPolicyResult;
}

const createOrderedCacheBehaviors = (params: ICreateOrderedCacheBehaviorsParams) => {
    const { domains, cachePolicyId, originRequestPolicyId } = params;
    return domains.reduce<inputs.cloudfront.DistributionOrderedCacheBehavior[]>(
        (collection, domain) => {
            for (const type in domain.domains) {
                const originId = createOriginId({
                    type,
                    name: domain.name
                });
                const domainName = domain.domains[type as keyof typeof domain.domains];
                if (!domainName) {
                    continue;
                }
                collection.push({
                    pathPattern: "*",
                    targetOriginId: originId,
                    viewerProtocolPolicy: "redirect-to-https",
                    allowedMethods: BLUE_GREEN_ALLOWED_METHODS,
                    cachedMethods: BLUE_GREEN_CACHED_METHODS,
                    cachePolicyId: cachePolicyId.id,
                    originRequestPolicyId: originRequestPolicyId.id
                    // forwardedValues: {
                    //     queryString: true,
                    //     cookies: {
                    //         forward: "all"
                    //     },
                    //     headers: [BLUE_GREEN_ROUTER_HEADER]
                    // }
                });
            }
            return collection;
        },
        []
    );
};

export type IGetCloudFrontConfigParams = ICreateOrderedCacheBehaviorsParams & ICreateOriginsParams;

export const getCloudFrontConfig = (params: IGetCloudFrontConfigParams) => {
    const origins = createOrigins(params);
    const orderedCacheBehaviors = createOrderedCacheBehaviors(params);

    return {
        origins,
        orderedCacheBehaviors
    };
};
