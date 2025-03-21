import React from "react";
import { NavigationRenderer, useAdminConfig } from "@webiny/app-admin";
import { Sidebar } from "@webiny/admin-ui";
import wbyLogo from "./wby-logo.png";
import { SidebarMenuItems } from "./SidebarMenuItems";

export const Navigation = NavigationRenderer.createDecorator(() => {
    return function Navigation() {
        const { menus } = useAdminConfig();

        // TODO (next PR): These will be registered via config API.
        const title = "Webiny";
        const icon = (
            <Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"} />} label={"Webiny"} />
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
