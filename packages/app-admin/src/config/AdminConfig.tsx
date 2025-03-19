import React from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Menu, type MenuConfig } from "./AdminConfig/Menu";
import { Route } from "./AdminConfig/Route";
import { Theme } from "./AdminConfig/Theme";
import { createProvider } from "@webiny/app";

const base = createConfigurableComponent<AdminConfig>("AdminConfig");

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

interface AdminConfig {
    menus: MenuConfig[];
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
        menus: baseConfig.menus ?? []
    };
};

export const AdminConfig = Object.assign(base.Config, {
    Theme,
    Menu,
    Route,
    useAdminConfig
});
