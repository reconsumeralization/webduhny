import type { IBlueGreenDomains, IBlueGreenSources } from "../types.js";
import { createOriginId } from "./createOriginId.js";

export interface ICreateCloudFrontFunctionDomainMapParamsResult {
    /**
     * Name of the deployment (eg. green, blue, orange, etc.).
     */
    name: string;
    sourceDomain: string;
    targetOriginId: string;
}

export interface ICreateCloudFrontFunctionDomainMapParams {
    domains: IBlueGreenDomains;
    sources: IBlueGreenSources;
}

export const createCloudFrontFunctionDomainMap = (
    params: ICreateCloudFrontFunctionDomainMapParams
): ICreateCloudFrontFunctionDomainMapParamsResult[] => {
    const { domains, sources } = params;

    const results: ICreateCloudFrontFunctionDomainMapParamsResult[] = [];
    for (const domain of domains) {
        for (const app in sources) {
            const key = app as keyof typeof sources;

            const sourceDomain = sources[key];
            if (!sourceDomain) {
                continue;
            }
            results.push({
                name: domain.name,
                sourceDomain,
                targetOriginId: createOriginId({
                    type: key,
                    name: domain.name
                })
            });
        }
    }
    return results;
};
