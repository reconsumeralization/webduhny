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

function use() {
    const config = base.useConfig();

    return {
        themes: config.themes || []
    };
}

export const AdminConfigProvider = createProvider(Original => {
    return function AdminConfigProvider({ children }) {
        return (
            <AdminWithConfig>
                <Original>{children}</Original>
            </AdminWithConfig>
        );
    };
});

export const AdminConfig = Object.assign(base.Config, {
    Theme,
    use
});
