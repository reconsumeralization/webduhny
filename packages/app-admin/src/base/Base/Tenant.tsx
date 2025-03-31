import React from "react";
import { AdminConfig } from "~/config/AdminConfig";
import wbyLogo from "./Tenant/wby-logo.png";

export const Tenant = React.memo(() => {
    const { Tenant } = AdminConfig;
    return (
        <AdminConfig>
            <Tenant>
                <Tenant.Name value={"Webiny"} />
                <Tenant.Logo element={<img src={wbyLogo} alt={"Webiny"} />} />
            </Tenant>
        </AdminConfig>
    );
});

Tenant.displayName = "Tenant";
