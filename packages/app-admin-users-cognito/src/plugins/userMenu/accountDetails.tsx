import React from "react";
import { Link } from "@webiny/react-router";
import { ReactComponent as AccountIcon } from "~/assets/icons/round-account_circle-24px.svg";
import { ReactComponent as LogoutIcon } from "~/assets/icons/logout_black_24dp.svg";
import { useSecurity } from "@webiny/app-security";
import { useTenancy } from "@webiny/app-tenancy";
import { useIsDefaultTenant } from "./useIsDefaultTenant";
import { DropdownMenu } from "@webiny/admin-ui";

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
                icon={<LogoutIcon />}
                onClick={() => tenancy.setTenant(defaultTenant.id)}
                content={"Exit tenant"}
            />
        );
    }

    if (!security.identity.profile) {
        return null;
    }

    return (
        <DropdownMenu.Item
            icon={<AccountIcon />}
            content={<Link to={accountRoute}>Account details</Link>}
        />
    );
};
