import type { Identity } from "@webiny/api-authentication/types";

export interface IGetIdentityGateway<TIdentity = Identity> {
    execute: () => TIdentity;
}
