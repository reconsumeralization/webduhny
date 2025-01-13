// extensions/adminTheme/src/index.tsx
import React from "react";
import { AdminConfig } from "@webiny/app-admin";

const { Theme } = AdminConfig;
export const Extension = () => {
    return (
        <>
            <AdminConfig>
                <Theme /*tenants={["root"]}*/>
                    <Theme.Color palette={"primary"} color={"#E3B505"} />
                    <Theme.Color palette={"secondary"} color={"#95190C"} />
                    <Theme.Color palette={"neutral"} color={"#E3B505"} />
                </Theme>
            </AdminConfig>
        </>
    );
};
