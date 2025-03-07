import type { IGetApplicationStacksResult } from "./getApplicationDomains.js";
import type { IBlueGreenDomain, IBlueGreenDomains } from "../types.js";

export interface IConvertApplicationDomainsParams {
    input: IGetApplicationStacksResult;
}

export const convertApplicationDomains = (
    params: IConvertApplicationDomainsParams
): IBlueGreenDomains => {
    const { input } = params;

    const result = Object.keys(input).map<IBlueGreenDomain>(name => {
        const value = input[name];
        return {
            name,
            domains: {
                api: value.api,
                admin: value.admin,
                website: value.website,
                preview: value.preview
            }
        };
    });
    if (result.length !== 2) {
        throw new Error("Invalid number of domains.");
    }
    return result as IBlueGreenDomains;
};
