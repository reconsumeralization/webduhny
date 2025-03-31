import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";
import logo from "./img.png";

const { Tenant, Theme } = AdminConfig;

export const Extension = () => {
    return (
        <>
            <AdminConfig>
                <Theme>
                    <Theme.Color palette={"primary"} color={"#c11b17"} />
                </Theme>
                <Tenant>
                    <Tenant.Name value={"Motortrend"} />
                    <Tenant.Logo element={<img src={logo} alt={"Webiny"} />} />
                </Tenant>
            </AdminConfig>
        </>
    );
};
