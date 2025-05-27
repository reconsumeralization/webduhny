import React from "react";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity";
import { ReactComponent as SignOutIcon } from "@webiny/icons/logout.svg";
import { AdminConfig, makeDecoratable } from "@webiny/app-admin";

const { Menu } = AdminConfig;

export const SignOut = makeDecoratable("SignOut", () => {
    const { identity } = useSecurity();

    if (!identity) {
        return null;
    }

    if (typeof identity.logout !== "function") {
        console.warn(`Missing "logout" function implementation in SecurityIdentity!`);
        return null;
    }

    return (
        <Menu.User.Item
            text={"Sign out"}
            icon={<Menu.User.Item.Icon element={<SignOutIcon />} label={"Sign out"} />}
            onClick={identity.logout}
        />
    );
});
