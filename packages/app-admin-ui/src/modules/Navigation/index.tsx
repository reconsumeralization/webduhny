import React, { Fragment } from "react";
import {
    useAdminConfig,
    Compose,
    NavigationRenderer as NavigationSpec,
    Provider
} from "@webiny/app-admin";
import { SidebarProvider } from "@webiny/admin-ui/Sidebar/components/SidebarProvider";
import { Sidebar } from "@webiny/admin-ui";
import wbyLogo from "./wby-logo.png";
import { NavigationMenuItems } from "./NavigationMenuItems";

interface NavigationProviderProps {
    children?: React.ReactNode;
}

const NavigationProvider = (Component: React.ComponentType<NavigationProviderProps>) => {
    return function NavigationProvider(props: NavigationProviderProps) {
        return (
            <SidebarProvider>
                <Component {...props} />
            </SidebarProvider>
        );
    };
};

export const NavigationImpl = () => {
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
                footer={<NavigationMenuItems menus={menus} where={{ tags: ["footer"] }} />}
            >
                <NavigationMenuItems menus={menus} />
            </Sidebar>
        );
    };
};

export const Navigation = () => {
    return (
        <>
            <Provider hoc={NavigationProvider} />
            <Compose component={NavigationSpec} with={NavigationImpl} />
        </>
    );
};
