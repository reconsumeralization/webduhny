import React from "react";
import { UserMenu as BaseUserMenu } from "./UserMenu/UserMenu";
import { UserMenuHandle } from "./UserMenu/UserMenuHandle";
import { UserMenuItem } from "./UserMenu/UserMenuItem";

export const UserMenu = () => {
    return (
        <>
            <UserMenuHandle />
            <BaseUserMenu />
            <UserMenuItem />
        </>
    );
};
