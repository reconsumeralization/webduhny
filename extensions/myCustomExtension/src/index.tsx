// extensions/adminTheme/src/index.tsx
import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

const { Theme } = AdminConfig;

export const Extension = () => {
    return (
        <AdminConfig>
            <Theme>
                <Theme.Color palette={"primary"} color={"purple"} />
            </Theme>
        </AdminConfig>
    );
};
