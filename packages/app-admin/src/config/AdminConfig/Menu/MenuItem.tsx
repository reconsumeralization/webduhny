import React from "react";
import { makeDecoratable } from "~/index";
import { Sidebar, type SidebarMenuItemButtonProps } from "@webiny/admin-ui";

const MenuLinkBase = (props: SidebarMenuItemButtonProps) => {
    return <Sidebar.Item {...props} />;
};

const DecoratableMenuItem = makeDecoratable("MenuItem", MenuLinkBase);

const MenuItem = Object.assign(DecoratableMenuItem, {
    Action: Sidebar.Item.Action,
    Icon: Sidebar.Item.Icon
});

export { MenuItem };
