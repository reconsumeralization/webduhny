import React from "react";
import { UserMenu as BaseUserMenu } from "./UserMenu/UserMenu";
import { UserMenuHandle } from "./UserMenu/UserMenuHandle";
import { UserMenuItem, UserMenuItemIcon } from "./UserMenu/UserMenuItem";
import { UserMenuLink, UserMenuLinkIcon } from "./UserMenu/UserMenuLink";
import { UserMenuSeparator } from "./UserMenu/UserMenuSeparator";

export const UserMenu = () => {
    return (
        <>
            <UserMenuHandle />
            <BaseUserMenu />
            <UserMenuItem />
            <UserMenuItemIcon />
            <UserMenuLink />
            <UserMenuLinkIcon />
            <UserMenuSeparator />
        </>
    );
};
