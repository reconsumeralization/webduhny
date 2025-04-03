import React from "react";
import { LogoRenderer, useAdminConfig } from "@webiny/app-admin";

export const Logo = LogoRenderer.createDecorator(() => {
    return function Logo() {
        const { tenant } = useAdminConfig();
        return <>{tenant.logo || null}</>;
    };
});
