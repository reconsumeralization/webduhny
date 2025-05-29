import type { SecurityPermission } from "@webiny/api-security/types";

export interface IListPermissionsGateway {
    execute: () => Promise<SecurityPermission[]>;
}
