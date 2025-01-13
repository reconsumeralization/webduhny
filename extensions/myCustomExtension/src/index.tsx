// extensions/adminTheme/src/index.tsx
import React from "react";
import { AdminConfig, Plugin } from "@webiny/app-admin";
import { useSecurity } from "@webiny/app-serverless-cms";
// import { IsNotRootTenant, IsRootTenant } from "@webiny/app-tenant-manager";
// import { useSecurity } from "@webiny/app-serverless-cms";

const { Theme } = AdminConfig;

const SomethingWithSecurityMustBeChildOfPlugin = () => {
    console.log("Try using security");
    const sec = useSecurity();
    console.log(sec)
    return null;

    // const sec = useSecurity();
    // return (
    //     <>
    //         <IsRootTenant>
    //             <AdminConfig>
    //                 <Theme>
    //                     <Theme.Color palette={"primary"} color={"red"} />
    //                 </Theme>
    //             </AdminConfig>
    //         </IsRootTenant>
    //         <IsNotRootTenant>
    //             <AdminConfig>
    //                 <Theme>
    //                     <Theme.Color palette={"primary"} color={"blue"} />
    //                 </Theme>
    //             </AdminConfig>
    //         </IsNotRootTenant>
    //     </>
    // );
};

export const Extension = () => {
    return (
        <Plugin>
            {/* <Plugin> element makes its children render here: `packages/app/src/App.tsx:144` */}
            <SomethingWithSecurityMustBeChildOfPlugin />
        </Plugin>
    );
};
