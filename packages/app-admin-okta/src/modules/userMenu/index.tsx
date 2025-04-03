import React, { Fragment } from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";
import { UserInfo } from "./UserInfo";
import { SignOut } from "./SignOut";
import { UserMenuHandle } from "./UserMenuHandle";
import { ExitTenant } from "./ExitTenant";

const { Menu } = AdminConfig;

export const UserMenuModule = () => {
    return (
        <Fragment>
            <UserMenuHandle />
            <AdminConfig>
                <Menu.User name={"exitTenant"} element={<ExitTenant />} />
                <Menu.User name={"signOut"} element={<SignOut />} />
                <Menu.User name={"userInfo"} element={<UserInfo />} />
            </AdminConfig>
        </Fragment>
    );
};
