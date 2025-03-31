import React from "react";
import { useSecurity } from "@webiny/app-security";
import { useTenancy } from "@webiny/app-tenancy";
import { useIsDefaultTenant } from "./useIsDefaultTenant";
import { ReactComponent as AccountIcon } from "@material-design-icons/svg/outlined/account_circle.svg";
import { ReactComponent as SignOutIcon } from "@material-design-icons/svg/outlined/logout.svg";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

export const AccountDetails = () => {
    const security = useSecurity();
    const tenancy = useTenancy();
    const isDefaultTenant = useIsDefaultTenant();

    if (!security || !security.identity) {
        return null;
    }

    // This is only applicable in multi-tenant environments
    const { defaultTenant } = security.identity;

    if (tenancy && !isDefaultTenant) {
        return (
            <Menu.User
                name={"cognito.settings.exitTenant"}
                element={
                    <Menu.User.Item
                        icon={<Menu.User.Item.Icon element={<SignOutIcon />} label={"Exit tenant"} />}
                        text={"Exit tenant"}
                        onClick={() => tenancy.setTenant(defaultTenant.id)}
                    />
                }
            />
        );
    }

    if (!security.identity.profile) {
        return null;
    }

    return (
        <Menu.User
            name={"cognito.settings.account"}
            element={
                <Menu.User.Link
                    icon={<Menu.User.Item.Icon element={<AccountIcon />} label={"Account settings"} />}
                    text={"Account settings"}
                    to={"/account"}
                />
            }
        />
    );
};
