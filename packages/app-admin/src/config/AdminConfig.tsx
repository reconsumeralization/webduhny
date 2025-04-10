import React from "react";
import { AppContainer, Plugin } from "@webiny/app";
import { Menu, type MenuConfig } from "./AdminConfig/Menu";
import { Tenant, TenantConfig } from "./AdminConfig/Tenant";
import type { SupportMenuConfig } from "./AdminConfig/Menu/SupportMenu";
import type { UserMenuConfig } from "./AdminConfig/Menu/UserMenu";
import { Route } from "./AdminConfig/Route";
import { Theme } from "./AdminConfig/Theme";
import { createAdminConfig } from "./createAdminConfig";

const base = createAdminConfig<AdminConfig>();

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

interface AdminConfig {
    menus: MenuConfig[];
    supportMenus: SupportMenuConfig[];
    userMenus: UserMenuConfig[];
    tenant: TenantConfig;
}

export const AdminConfigProvider = AppContainer.createDecorator(Original => {
    return function AdminConfigProvider({ children }) {
        return (
            <>
                {/* Wrap the entire app with an AdminConfig provider, and apply all public configs. */}
                <Original>
                    <AdminWithConfig>
                        <base.ApplyPublicConfig />
                        {children}
                    </AdminWithConfig>
                </Original>
                {/* Once the app fully renders (after the LoginScreen), apply protected configs. */}
                <Plugin>
                    <base.ApplyProtectedConfig />
                </Plugin>
            </>
        );
    };
});

export const useAdminConfig = () => {
    const baseConfig = base.useConfig();

    return {
        menus: baseConfig.menus ?? [],
        userMenus: baseConfig.userMenus ?? [],
        supportMenus: baseConfig.supportMenus ?? [],
        tenant: baseConfig.tenant || {}
    };
};

export interface PublicProps {
    children: React.ReactNode;
}

export const Public = ({ children }: PublicProps) => {
    return <base.PublicConfig>{children}</base.PublicConfig>;
};

export interface PrivateProps {
    children: React.ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
    return <base.PrivateConfig>{children}</base.PrivateConfig>;
};

export const AdminConfig = Object.assign(Private, {
    Public,
    Theme,
    Menu,
    Route,
    Tenant,
    useAdminConfig
});
