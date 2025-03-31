import React from "react";
import { createVoidComponent, makeDecoratable } from "~/index";
import type {
    SidebarMenuItemActionProps,
    SidebarMenuItemIconProps,
    SidebarMenuItemLinkProps
} from "@webiny/admin-ui/Sidebar/components/items/SidebarMenuItem";

// UserMenuLink
type UserMenuLinkRendererProps = SidebarMenuItemLinkProps;

const UserMenuLinkRenderer = makeDecoratable(
    "UserMenuLinkRenderer",
    createVoidComponent<UserMenuLinkRendererProps>()
);

const UserMenuLink = makeDecoratable("UserMenuLink", (props: UserMenuLinkRendererProps) => {
    return <UserMenuLinkRenderer {...props} />;
});

// UserMenuLink > Action
type SidebarMenuItemActionRendererProps = SidebarMenuItemActionProps;

const UserMenuLinkActionRenderer = makeDecoratable(
    "UserMenuLinkAction",
    createVoidComponent<SidebarMenuItemActionRendererProps>()
);

const UserMenuLinkAction = makeDecoratable(
    "UserMenuLinkAction",
    (props: SidebarMenuItemActionRendererProps) => {
        return <UserMenuLinkActionRenderer {...props} />;
    }
);

// UserMenuLink > Icon
type SidebarMenuItemIconRendererProps = SidebarMenuItemIconProps;

const UserMenuLinkIconRenderer = makeDecoratable(
    "UserMenuLinkIcon",
    createVoidComponent<SidebarMenuItemIconProps>()
);

const UserMenuLinkIcon = makeDecoratable(
    "UserMenuLinkIcon",
    (props: SidebarMenuItemIconRendererProps) => {
        return <UserMenuLinkIconRenderer {...props} />;
    }
);

export {
    UserMenuLink,
    UserMenuLinkRenderer,
    UserMenuLinkAction,
    UserMenuLinkActionRenderer,
    UserMenuLinkIcon,
    UserMenuLinkIconRenderer,
    type UserMenuLinkRendererProps,
    type SidebarMenuItemActionRendererProps,
    type SidebarMenuItemIconRendererProps
};
