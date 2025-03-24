import type { Unwrap } from "@pulumi/pulumi";
import type { ProviderArgs } from "@pulumi/aws";
import { Provider } from "@pulumi/aws";
import type { RegionProvider } from "./types.js";

export const createRegionProvider = (
    params: Unwrap<ProviderArgs & Required<Pick<ProviderArgs, "region">>>
): RegionProvider => {
    const provider = new Provider(params.region, params);
    return {
        provider,
        name: params.region
    };
};
