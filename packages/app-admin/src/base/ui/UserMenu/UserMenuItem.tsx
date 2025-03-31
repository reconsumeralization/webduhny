import React from "react";
import { createVoidComponent, makeDecoratable } from "~/index";
import type {
    SidebarMenuItemActionProps,
    SidebarMenuItemIconProps,
    SidebarMenuItemButtonProps
} from "@webiny/admin-ui/Sidebar/components/items/SidebarMenuItem";

// UserMenuItem
type UserMenuItemRendererProps = SidebarMenuItemButtonProps;

const UserMenuItemRenderer = makeDecoratable(
    "UserMenuItemRenderer",
    createVoidComponent<UserMenuItemRendererProps>()
);

const UserMenuItem = makeDecoratable("UserMenuItem", (props: UserMenuItemRendererProps) => {
    return <UserMenuItemRenderer {...props} />;
});

// UserMenuItem > Action
type UserMenuItemActionRendererProps = SidebarMenuItemActionProps;

const UserMenuItemActionRenderer = makeDecoratable(
    "UserMenuItemAction",
    createVoidComponent<UserMenuItemActionRendererProps>()
);

const UserMenuItemAction = makeDecoratable(
    "UserMenuItemAction",
    (props: UserMenuItemActionRendererProps) => {
        return <UserMenuItemActionRenderer {...props} />;
    }
);

// UserMenuItem > Icon
type UserMenuItemIconRendererProps = SidebarMenuItemIconProps;

const UserMenuItemIconRenderer = makeDecoratable(
    "UserMenuItemIcon",
    createVoidComponent<UserMenuItemIconRendererProps>()
);

const UserMenuItemIcon = makeDecoratable(
    "UserMenuItemIcon",
    (props: UserMenuItemIconRendererProps) => {
        return <UserMenuItemIconRenderer {...props} />;
    }
);

export {
    UserMenuItem,
    UserMenuItemRenderer,
    UserMenuItemAction,
    UserMenuItemActionRenderer,
    UserMenuItemIcon,
    UserMenuItemIconRenderer,
    type UserMenuItemRendererProps,
    type UserMenuItemActionRendererProps,
    type UserMenuItemIconRendererProps
};
