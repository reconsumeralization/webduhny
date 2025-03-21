import React from "react";
import { useSecurity } from "@webiny/app-security";
import { useTenancy } from "@webiny/app-tenancy";
import { useIsDefaultTenant } from "./useIsDefaultTenant";
import { DropdownMenu } from "@webiny/admin-ui";
import { ReactComponent as AccountIcon } from "@material-design-icons/svg/outlined/account_circle.svg";
import { ReactComponent as SignOutIcon } from "@material-design-icons/svg/outlined/logout.svg";

interface AccountDetailsProps {
    accountRoute: `/${string}`;
}

export const AccountDetails = ({ accountRoute }: AccountDetailsProps) => {
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
            <DropdownMenu.Item
                icon={<DropdownMenu.Link.Icon element={<SignOutIcon />} label={"Exit tenant"} />}
                onClick={() => tenancy.setTenant(defaultTenant.id)}
                text={"Exit tenant"}
            />
        );
    }

    if (!security.identity.profile) {
        return null;
    }

    return (
        <DropdownMenu.Link
            icon={<DropdownMenu.Link.Icon element={<AccountIcon />} label={"Account settings"} />}
            to={accountRoute}
            text={"Account settings"}
        />
    );
};
