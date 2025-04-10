import React from "react";
import { SidebarMenuProvider } from "./SidebarMenuProvider";

interface SidebarMenuProps {
    children: React.ReactNode;
}

const SidebarMenuRoot = (props: SidebarMenuProps) => (
    <SidebarMenuProvider>
        <ul
            data-sidebar="menu"
            className={"wby-flex wby-w-full wby-min-w-0 wby-flex-col wby-gap-y-xs"}
            {...props}
        />
    </SidebarMenuProvider>
);

export { SidebarMenuRoot, type SidebarMenuProps };
