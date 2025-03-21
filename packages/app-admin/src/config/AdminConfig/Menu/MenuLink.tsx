import React from "react";
import { makeDecoratable } from "~/index";
import { Sidebar, type SidebarMenuItemLinkProps } from "@webiny/admin-ui";
import { useLocation } from "@webiny/react-router";

const MenuLinkBase = (props: SidebarMenuItemLinkProps) => {
    const location = useLocation();
    return <Sidebar.Link {...props} active={location.pathname === props.to} />;
};

const DecoratableMenuLink = makeDecoratable("MenuLink", MenuLinkBase);

const MenuLink = Object.assign(DecoratableMenuLink, {
    Action: Sidebar.Link.Action,
    Icon: Sidebar.Link.Icon
});

export { MenuLink };
