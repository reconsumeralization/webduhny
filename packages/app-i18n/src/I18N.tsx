import React, { Fragment, memo } from "react";
import { plugins } from "@webiny/plugins";
import { Provider } from "@webiny/app-admin";
import { I18NProvider as ContextProvider } from "./contexts/I18N";
import { HasPermission } from "@webiny/app-security";
import { Layout } from "@webiny/app-admin";
import { LocalesView } from "./admin/views/locales";
import i18nPlugins from "./admin/plugins";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

interface I18NProviderProps {
    children: React.ReactNode;
}

const I18NProviderHOC = (Component: React.ComponentType<I18NProviderProps>) => {
    return function I18NProvider({ children }: I18NProviderProps) {
        return (
            <ContextProvider>
                <Component>{children}</Component>
            </ContextProvider>
        );
    };
};

const I18NExtension = () => {
    plugins.register(i18nPlugins());

    /**
     * TODO @ts-refactor
     * Provider.hoc expects ComponentType.
     */
    return (
        <Fragment>
            <Provider hoc={I18NProviderHOC} />
            <AdminConfig>
                <HasPermission name={"i18n.locale"}>
                    <Route
                        name={"i18n.locales"}
                        exact
                        path={"/i18n/locales"}
                        element={
                            <Layout title={"I18N - Locales"}>
                                <LocalesView />
                            </Layout>
                        }
                    />
                    <Menu
                        name="i18n.settings"
                        parent={"settings"}
                        element={<Menu.Group label={"Languages"} />}
                    />
                    <Menu
                        name="i18n.settings.locales"
                        parent={"settings"}
                        element={<Menu.Link label={"Locales"} path={"/i18n/locales"} />}
                    />
                </HasPermission>
            </AdminConfig>
        </Fragment>
    );
};

export const I18N = memo(I18NExtension);
