import React from "react";
import { UserMenu as BaseUserMenu } from "./UserMenu/UserMenu";
import { UserMenuHandle } from "./UserMenu/UserMenuHandle";
import { UserMenuItem } from "./UserMenu/UserMenuItem";
import { UserMenuLink } from "./UserMenu/UserMenuLink";
import { UserMenuSeparator } from "./UserMenu/UserMenuSeparator";

export const UserMenu = () => {
    return (
        <>
            <UserMenuHandle />
            <BaseUserMenu />
            <UserMenuItem />
            <UserMenuLink />
            <UserMenuSeparator />
        </>
    );
};
