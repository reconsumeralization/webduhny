import React from "react";
import { SidebarMenuItem, type SidebarMenuItemGroupProps } from "./SidebarMenuItem";
import { makeDecoratable, withStaticProps } from "~/utils";
import {
    SidebarMenuItemIcon,
    SidebarMenuItemIconProps
} from "~/Sidebar/components/items/SidebarMenuItemIcon";
import {
    SidebarMenuItemAction,
    SidebarMenuItemActionProps
} from "~/Sidebar/components/items/SidebarMenuItemAction";

const SidebarMenuGroupBase = (props: SidebarMenuItemGroupProps) => {
    return <SidebarMenuItem variant={"group-label"} {...props} />;
};

const DecoratableSidebarMenuGroup = makeDecoratable("SidebarMenuGroup", SidebarMenuGroupBase);

const SidebarMenuGroup = withStaticProps(DecoratableSidebarMenuGroup, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export {
    SidebarMenuGroup,
    type SidebarMenuItemGroupProps,
    type SidebarMenuItemIconProps,
    type SidebarMenuItemActionProps
};
