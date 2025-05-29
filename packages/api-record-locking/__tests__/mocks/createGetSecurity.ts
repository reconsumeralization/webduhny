import type { Security } from "@webiny/api-security/types";

export const createGetSecurity = () => {
    return (): Pick<Security, "withoutAuthorization"> => {
        return {
            withoutAuthorization: async cb => {
                return await cb();
            }
        };
    };
};
