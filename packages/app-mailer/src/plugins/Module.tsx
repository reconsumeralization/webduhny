import React, { lazy, Suspense } from "react";
import { AdminConfig, Plugins, Layout } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import Helmet from "react-helmet";
import { usePermission } from "~/hooks/usePermission";
import { CircularProgress } from "@webiny/ui/Progress";

const { Menu, Route } = AdminConfig;

const Settings = lazy(
    () =>
        import(
            /* webpackChunkName: "MailerModuleSettings" */
            "~/views/settings"
        )
);

interface LoaderProps {
    children: React.ReactElement;
}

const Loader = ({ children, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const MailerSettings = () => {
    const { canChangeSettings } = usePermission();

    const changeSettings = canChangeSettings();

    if (!changeSettings) {
        return null;
    }

    return (
        <HasPermission name={"mailer.settings"}>
            <AdminConfig>
                <Route
                    name={"mailer.settings"}
                    exact
                    path={"/mailer/settings"}
                    element={
                        <Layout>
                            <Helmet title={"Mailer - Settings"} />
                            <Loader>
                                <Settings />
                            </Loader>
                        </Layout>
                    }
                />
                <Menu
                    name={"mailer.settings"}
                    parent={"settings"}
                    element={<Menu.Group label={"Mailer"} />}
                />
                <Menu
                    name={"mailer.settings.general"}
                    parent={"settings"}
                    element={<Menu.Link label={"Settings"} path={"/mailer/settings"} />}
                />
            </AdminConfig>
        </HasPermission>
    );
};

export const Module = () => {
    return (
        <Plugins>
            <MailerSettings />
        </Plugins>
    );
};
