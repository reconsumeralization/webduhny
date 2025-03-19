import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { Layout, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { Permission } from "~/plugins/constants";
import { Groups } from "~/ui/views/Groups";
import { Teams } from "~/ui/views/Teams";
import { ApiKeys } from "~/ui/views/ApiKeys";
import accessManagementPlugins from "./plugins";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

/**
 * TODO @ts-refactor
 * Find out why is there empty default export
 */
export default () => [];

const AccessManagementExtension = () => {
    plugins.register(accessManagementPlugins());

    const { getProject } = useWcp();

    const project = getProject();
    let teams = false;
    if (project) {
        teams = project.package.features.advancedAccessControlLayer.options.teams;
    }

    return (
        <AdminConfig>
            <HasPermission name={Permission.Groups}>
                <Route
                    name={"security.groups"}
                    exact
                    path={"/access-management/roles"}
                    element={
                        <Layout title={"Access Management - Roles"}>
                            <Groups />
                        </Layout>
                    }
                />
            </HasPermission>
            {teams && (
                <HasPermission name={Permission.Teams}>
                    <Route
                        name={"security.teams"}
                        exact
                        path={"/access-management/teams"}
                        element={
                            <Layout title={"Access Management - Teams"}>
                                <Teams />
                            </Layout>
                        }
                    />
                </HasPermission>
            )}
            <HasPermission name={Permission.ApiKeys}>
                <Route
                    name={"security.apiKeys"}
                    exact
                    path={"/access-management/api-keys"}
                    element={
                        <Layout title={"Access Management - API Keys"}>
                            <ApiKeys />
                        </Layout>
                    }
                />
            </HasPermission>

            <HasPermission any={[Permission.Groups, Permission.ApiKeys, Permission.Teams]}>
                <Menu
                    name={"security.settings"}
                    parent={"settings"}
                    element={<Menu.Group label={"Access Management"} />}
                />
            </HasPermission>
            <HasPermission name={Permission.Groups}>
                <Menu
                    name={"security.roles"}
                    parent={"settings"}
                    element={<Menu.Link label={"Roles"} path={"/access-management/roles"} />}
                />
            </HasPermission>
            {teams && (
                <HasPermission name={Permission.Teams}>
                    <Menu
                        name={"security.teams"}
                        parent={"settings"}
                        element={<Menu.Link label={"Teams"} path={"/access-management/teams"} />}
                    />
                </HasPermission>
            )}

            <HasPermission name={Permission.ApiKeys}>
                <Menu
                    name={"security.apiKeys"}
                    parent={"settings"}
                    element={<Menu.Link label={"API Keys"} path={"/access-management/api-keys"} />}
                />
            </HasPermission>
        </AdminConfig>
    );
};

export const AccessManagement = memo(AccessManagementExtension);
