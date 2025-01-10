import { createConfigurableComponent } from "@webiny/react-properties";
import { Theme, ThemeConfig } from "./Theme";

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
        themes: config.themes || [],
    };
}

export const AdminConfig = Object.assign(base.Config, {
    Theme,
    useAdminConfig
});
