import { TenantSelector as BaseTenantSelector, useWcp } from "@webiny/app-admin";
import React, { Fragment, memo } from "react";
import { AddTenantFormField } from "./components/AddTenantFormField";
import { CurrentTenant } from "./components/CurrentTenant";
import { DomainsModule } from "./modules/domains";
import { TenantsModule } from "./modules/tenants";

const TenantSelector = BaseTenantSelector.createDecorator(() => {
    return function TenantSelector() {
        return <CurrentTenant />;
    };
});

const TenantManagerExtension = () => {
    const wcp = useWcp();
    if (!wcp.canUseFeature("multiTenancy")) {
        return null;
    }

    return (
        <Fragment>
            <TenantSelector />
            <TenantsModule />
            <DomainsModule />
        </Fragment>
    );
};

export const TenantManager: React.ComponentType = memo(TenantManagerExtension);

export { useCurrentTenant } from "./hooks/useCurrentTenant";
export { IsRootTenant, IsNotRootTenant, IsTenant } from "./components/IsRootTenant";
export { AddTenantFormField };
