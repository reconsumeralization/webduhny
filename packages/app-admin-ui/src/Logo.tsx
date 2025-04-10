import React from "react";
import { LogoRenderer, useAdminConfig } from "@webiny/app-admin";

const minHeight = { minHeight: 48 };

export const Logo = LogoRenderer.createDecorator(() => {
    return function Logo() {
        const { tenant } = useAdminConfig();
        return <div style={minHeight}>{tenant.logo || null}</div>;
    };
});
