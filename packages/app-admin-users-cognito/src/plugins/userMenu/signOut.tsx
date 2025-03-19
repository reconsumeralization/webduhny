import React from "react";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity";
import { ReactComponent as SignOutIcon } from "~/assets/icons/round-lock_open-24px.svg";
import { DropdownMenu } from "@webiny/admin-ui";

export const SignOut = () => {
    const { identity } = useSecurity();

    if (!identity) {
        return null;
    }

    if (typeof identity.logout !== "function") {
        console.warn(`Missing "logout" function implementation in SecurityIdentity!`);
        return null;
    }

    return (
        <DropdownMenu.Item content={"Sign out"} icon={<SignOutIcon />} onClick={identity.logout} />
    );
};
