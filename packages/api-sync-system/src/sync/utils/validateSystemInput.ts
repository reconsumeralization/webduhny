import type { ISystem } from "~/sync/types.js";

export interface IValidResponse {
    system: ISystem;
    error?: never;
}

export interface IErrorResponse {
    error: true;
    system?: never;
}

export type ValidateSystemInputResponse = IValidResponse | IErrorResponse;

export const validateSystemInput = (system: Partial<ISystem>): ValidateSystemInputResponse => {
    const { env, name, region, variant } = system;
    if (!env) {
        console.error(
            "Sync System: No environment variable provided. Sync System will not be attached."
        );
        return {
            error: true
        };
    } else if (!name) {
        console.error("Sync System: No name variable provided. Sync System will not be attached.");
        return {
            error: true
        };
    } else if (!region) {
        console.error(
            "Sync System: No region variable provided. Sync System will not be attached."
        );
        return {
            error: true
        };
    }
    return {
        system: {
            env,
            name,
            region,
            variant
        }
    };
};
