import React from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Menu, type MenuConfig } from "./AdminConfig/Menu";
import type { SupportMenuConfig } from "./AdminConfig/Menu/SupportMenu";
import { Route } from "./AdminConfig/Route";
import { Theme } from "./AdminConfig/Theme";
import { createProvider } from "@webiny/app";

const base = createConfigurableComponent<AdminConfig>("AdminConfig");

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

interface AdminConfig {
    menus: MenuConfig[];
    supportMenus: SupportMenuConfig[];
}

export const AdminConfigProvider = createProvider(Original => {
    return function AdminConfigProvider({ children }) {
        return (
            <Original>
                <AdminWithConfig>{children}</AdminWithConfig>
            </Original>
        );
    };
});

export const useAdminConfig = () => {
    const baseConfig = base.useConfig();

    return {
        menus: baseConfig.menus ?? [],
        supportMenus: baseConfig.supportMenus ?? []
    };
};

export const AdminConfig = Object.assign(base.Config, {
    Theme,
    Menu,
    Route,
    useAdminConfig
});
