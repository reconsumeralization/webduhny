import type { AdminUser } from "@webiny/api-admin-users/types";

export interface IListAdminUsersGateway {
    execute: () => Promise<AdminUser[]>;
}
