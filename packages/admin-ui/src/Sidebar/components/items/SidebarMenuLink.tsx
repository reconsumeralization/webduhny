import React from "react";
import { SidebarMenuItem, type SidebarMenuItemLinkProps } from "./SidebarMenuItem";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarMenuItemIcon } from "~/Sidebar/components/items/SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "~/Sidebar/components/items/SidebarMenuItemAction";

const SidebarMenuLinkBase = (props: SidebarMenuItemLinkProps) => {
    return <SidebarMenuItem {...props} />;
};

const DecoratableSidebarMenuLink = makeDecoratable("SidebarMenuLink", SidebarMenuLinkBase);

const SidebarMenuLink = withStaticProps(DecoratableSidebarMenuLink, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export { SidebarMenuLink };
