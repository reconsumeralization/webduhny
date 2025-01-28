import React from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Theme } from "./AdminConfig/Theme";
import { createProvider } from "@webiny/app";

const base = createConfigurableComponent<AdminConfig>("AdminConfig");

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminConfig {
    // Add properties here. At the moment, we don't have any.
}

function useAdminConfig() {
    return base.useConfig();
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
    use: useAdminConfig
});
