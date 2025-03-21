import React from "react";
import { makeDecoratable } from "~/index";
import { Sidebar, type SidebarMenuItemButtonProps } from "@webiny/admin-ui";

const MenuGroupBase = (props: SidebarMenuItemButtonProps) => {
    return <Sidebar.Item {...props} variant={"group-label"} />;
};

export const DecoratableMenuGroup = makeDecoratable("MenuGroup", MenuGroupBase);

const MenuGroup = Object.assign(DecoratableMenuGroup, {
    Action: Sidebar.Item.Action,
    Icon: Sidebar.Item.Icon
});

export { MenuGroup };
