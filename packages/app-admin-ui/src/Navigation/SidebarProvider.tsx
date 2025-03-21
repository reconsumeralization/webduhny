import React from "react";
import { SidebarProvider as AdminUiSidebar } from "@webiny/admin-ui";

interface NavigationProviderProps {
    children?: React.ReactNode;
}

export const SidebarProvider = (Component: React.ComponentType<NavigationProviderProps>) => {
    return function SidebarProvider(props: NavigationProviderProps) {
        return (
            <AdminUiSidebar>
                <Component {...props} />
            </AdminUiSidebar>
        );
    };
};
