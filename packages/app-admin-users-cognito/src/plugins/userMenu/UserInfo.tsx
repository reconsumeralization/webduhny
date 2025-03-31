import React from "react";
import { AdminConfig } from "@webiny/app-admin";
import { Text } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { useIsDefaultTenant } from "~/plugins/userMenu/useIsDefaultTenant";

const { Menu } = AdminConfig;

interface UserInfoProps {
    accountRoute?: string;
}

export const UserInfo = ({ accountRoute }: UserInfoProps) => {
    const security = useSecurity();
    const isDefaultTenant = useIsDefaultTenant();

    if (!security || !security.identity) {
        return null;
    }

    const { profile, displayName } = security.identity;

    // Start with the assumption that the user doesn't have a profile in the system (external IDP).
    let content = (
        <Text size={"md"} className={"wby-font-bold"}>
            {displayName}
        </Text>
    );

    if (profile) {
        const { email, firstName, lastName } = profile;
        const fullName = `${firstName} ${lastName}`;

        content = (
            <>
                <Text size={"md"} className={"wby-block wby-font-semibold wby-mb-sm"}>
                    {fullName}
                </Text>

                <Text size={"sm"} className={"wby-block !wby-text-neutral-strong"}>
                    {email}
                </Text>
            </>
        );
    }

    let listItem = <Menu.User.Item text={content} />;
    if (accountRoute && isDefaultTenant) {
        listItem = <Menu.User.Link text={content} to={accountRoute} />;
    }

    return (
        <>
            {listItem}
            <Menu.User.Separator />
        </>
    );
};
