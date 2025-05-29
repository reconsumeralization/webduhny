import type { SecurityIdentity } from "@webiny/api-security/types";
import { createIdentity } from "~tests/helpers/identity";

export const createGetIdentity = () => {
    return (): SecurityIdentity => {
        return createIdentity();
    };
};
