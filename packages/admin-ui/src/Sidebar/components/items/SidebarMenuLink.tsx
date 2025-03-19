import React from "react";
import { SidebarMenuItem, type SidebarMenuItemLinkProps } from "./SidebarMenuItem";

const SidebarMenuLink = (props: SidebarMenuItemLinkProps) => {
    return <SidebarMenuItem {...props} />;
};

export { SidebarMenuLink };
