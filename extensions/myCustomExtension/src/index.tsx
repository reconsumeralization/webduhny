// extensions/adminTheme/src/index.tsx
import React from "react";
import { AdminConfig, Plugin, IsNotRootTenant, IsRootTenant } from "@webiny/app-serverless-cms";

const { Theme } = AdminConfig;

const SomethingWithSecurityMustBeChildOfPlugin = () => {
    return (
        <>
            <IsRootTenant>
                <AdminConfig>
                    <Theme>
                        <Theme.Color palette={"primary"} color={"purple"} />
                    </Theme>
                </AdminConfig>
            </IsRootTenant>
            <IsNotRootTenant>
                <AdminConfig>
                    <Theme>
                        <Theme.Color palette={"primary"} color={"blue"} />
                    </Theme>
                </AdminConfig>
            </IsNotRootTenant>
        </>
    );
};

export const Extension = () => {
    return (
        <Plugin>
            {/* <Plugin> element makes its children render here: `packages/app/src/App.tsx:144` */}
            <SomethingWithSecurityMustBeChildOfPlugin />
        </Plugin>
    );
};
