import React, { Fragment, memo } from "react";
import { AddUserMenuItem, Layout } from "@webiny/app-admin";
import { plugins } from "@webiny/plugins";
import { HasPermission } from "@webiny/app-security";
import { Permission } from "~/plugins/constants";
import { UsersView } from "~/ui/views/Users/UsersView";
import { Account } from "~/ui/views/Account";
import { AccountDetails } from "./plugins/userMenu/accountDetails";
import { SignOut } from "./plugins/userMenu/signOut";
import installation from "./plugins/installation";
import permissionRenderer from "./plugins/permissionRenderer";
import cognito from "./plugins/cognito";
import { CognitoLogin, CognitoProps } from "./CognitoLogin";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

const ACCOUNT_ROUTE = "/account";

const CognitoIdP = (props: CognitoProps) => {
    plugins.register([installation, permissionRenderer, cognito()]);

    return (
        <Fragment>
            <CognitoLogin
                config={props.config}
                userMenuItems={{ userInfo: false, signOut: false }}
            />
            <AdminConfig>
                <HasPermission name={Permission.Users}>
                    <Route
                        name={"cognito.users"}
                        path={"/admin-users"}
                        element={
                            <Layout title={"Admin Users"}>
                                <UsersView />
                            </Layout>
                        }
                    />
                    <Menu
                        name={"cognito.settings"}
                        parent={"settings"}
                        element={<Menu.Group label={"Admin Users"} />}
                    />
                    <Menu
                        name={"cognito.settings.adminUsers"}
                        parent={"settings"}
                        element={<Menu.Link label={"Users"} path={"/admin-users"} />}
                    />
                </HasPermission>

                <Route
                    name={"cognito.account"}
                    path={ACCOUNT_ROUTE}
                    element={
                        <Layout title={"User Account"}>
                            <Account />
                        </Layout>
                    }
                />
                <AddUserMenuItem element={<AccountDetails accountRoute={ACCOUNT_ROUTE} />} />
                <AddUserMenuItem element={<SignOut />} />
            </AdminConfig>
        </Fragment>
    );
};

export const Cognito = memo(CognitoIdP);
