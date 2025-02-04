import { createConfiguration } from "./configuration";

const MIN_CHARS = 5;

export interface IWithRegionParams {
    region: string | undefined;
}

export const withRegion = (params: IWithRegionParams) => {
    return createConfiguration(() => {
        const region = (params.region || "").trim();
        if (!region || region.length < MIN_CHARS) {
            return;
        }
        return {
            AWS_REGION: region
        };
    });
};
