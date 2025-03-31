import React from "react";
import {
    UserMenuItems,
    UserMenuRenderer as UserMenuRendererSpec,
    UserMenuHandle,
    useUserMenu
} from "@webiny/app-admin";
import { DropdownMenu } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";

export const UserMenu = UserMenuRendererSpec.createDecorator(() => {
    return function UserMenu() {
        const security = useSecurity();
        const { menuItems } = useUserMenu();

        if (!security || !security.identity) {
            return null;
        }

        return (
            <DropdownMenu trigger={<UserMenuHandle />} data-testid={"logged-in-user-menu-list"}>
                <UserMenuItems menuItems={menuItems} />
            </DropdownMenu>
        );
    };
});
