import { ISystem } from "../types";
import { createSystemName } from "~/utils/createSystemName.js";

export interface ICreateMockSystemParams {
    env?: string;
    variant?: string;
    region?: string;
    version?: string;
}

export const createMockSystem = (params?: ICreateMockSystemParams): ISystem => {
    const { env = "local", variant, region = "eu-central-1", version } = params || {};
    return {
        name: createSystemName({
            env,
            variant
        }),
        env,
        variant,
        region,
        version: version || (process.env.WEBINY_VERSION as string)
    };
};
