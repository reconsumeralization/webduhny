import { SecurityIdentity } from "@webiny/api-security/types";

export const createIdentity = (identity: Partial<SecurityIdentity> = {}): SecurityIdentity => {
    return {
        id: "12345678",
        type: "admin",
        displayName: "John Doe",
        ...identity
    };
};
