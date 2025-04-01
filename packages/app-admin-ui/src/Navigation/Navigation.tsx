import React from "react";
import { NavigationRenderer, useAdminConfig } from "@webiny/app-admin";
import { Sidebar } from "@webiny/admin-ui";
import { SidebarMenuItems } from "./SidebarMenuItems";
import { Link } from "@webiny/react-router";

export const Navigation = NavigationRenderer.createDecorator(() => {
    return function Navigation() {
        const { menus, tenant } = useAdminConfig();

        const title = tenant.name;
        const icon = (
            <Link to={"/"}>
                <Sidebar.Icon element={tenant.logo} label={"Webiny"} />
            </Link>
        );

        return (
            <Sidebar
                title={title}
                icon={icon}
                footer={<SidebarMenuItems menus={menus} where={{ tags: ["footer"] }} />}
            >
                <SidebarMenuItems menus={menus} />
            </Sidebar>
        );
    };
});
