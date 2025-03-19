import React from "react";
import { plugins } from "@webiny/plugins";
import { HasPermission } from "@webiny/app-security";
import { Layout } from "@webiny/app-admin";
import installation from "./plugins/installation";
import permissionRenderer from "./plugins/permissionRenderer";
import { FileManagerSettings } from "./views/FileManagerSettings";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

export const SettingsModule = () => {
    plugins.register(installation, permissionRenderer);

    return (
        <AdminConfig>
            <HasPermission name={"fm.settings"}>
                <Route
                    name={"settings.fm.general"}
                    path={"/settings/file-manager/general"}
                    element={
                        <Layout title={"File Manager - General Settings"}>
                            <FileManagerSettings />
                        </Layout>
                    }
                />
                <Menu
                    parent={"settings"}
                    name={"settings.fm"}
                    element={<Menu.Group label={"File Manager"} />}
                />
                <Menu
                    parent={"settings"}
                    name={"settings.fm.general"}
                    element={
                        <Menu.Link label={"General"} path={"/settings/file-manager/general"} />
                    }
                />
            </HasPermission>
        </AdminConfig>
    );
};
