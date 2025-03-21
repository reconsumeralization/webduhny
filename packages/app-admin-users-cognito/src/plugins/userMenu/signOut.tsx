import React from "react";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity";
import { ReactComponent as SignOutIcon } from "@material-design-icons/svg/outlined/logout.svg";
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
        <DropdownMenu.Item
            text={"Sign out"}
            icon={<DropdownMenu.Item.Icon element={<SignOutIcon />} label={"Sign out"} />}
            onClick={identity.logout}
        />
    );
};
