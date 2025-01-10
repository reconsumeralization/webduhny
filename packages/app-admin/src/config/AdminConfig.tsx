import React from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Theme, ThemeConfig } from "./Theme";
import { createProvider } from "@webiny/app";

const base = createConfigurableComponent<AdminConfig>("AdminConfig");

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

interface AdminConfig {
    themes: ThemeConfig[];
}

function useAdminConfig() {
    const config = base.useConfig();

    return {
        themes: config.themes || []
    };
}

export function AdminConfigProvider({ children }:any) {
    const config = base.useConfig();
    console.log('running base.useConfig in AdminConfigProvider', config);
    return (
        <AdminWithConfig>
            {children}
        </AdminWithConfig>
    );
}

export const AdminConfig = Object.assign(base.Config, {
    Theme,
    useAdminConfig
});
