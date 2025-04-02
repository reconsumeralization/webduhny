import React from "react";
import { SidebarMenuItem, type SidebarMenuItemLinkProps } from "./SidebarMenuItem";
import { makeDecoratable, withStaticProps } from "~/utils";
import {
    SidebarMenuItemIcon,
    type SidebarMenuItemIconProps
} from "~/Sidebar/components/items/SidebarMenuItemIcon";
import {
    SidebarMenuItemAction,
    type SidebarMenuItemActionProps
} from "~/Sidebar/components/items/SidebarMenuItemAction";

const SidebarMenuLinkBase = (props: SidebarMenuItemLinkProps) => {
    return <SidebarMenuItem {...props} />;
};

const DecoratableSidebarMenuLink = makeDecoratable("SidebarMenuLink", SidebarMenuLinkBase);

const SidebarMenuLink = withStaticProps(DecoratableSidebarMenuLink, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export {
    SidebarMenuLink,
    type SidebarMenuItemLinkProps,
    type SidebarMenuItemIconProps,
    type SidebarMenuItemActionProps
};
