import React from "react";
import { AddBindingContext, AddDataSourceContext, InjectDynamicValues } from "~/dataInjection";
import { DynamicElementRenderers } from "~/dataInjection/renderers/DynamicElementRenderers";

export const WebsiteDataInjection = React.memo(() => {
    return (
        <>
            <AddBindingContext />
            <AddDataSourceContext />
            <InjectDynamicValues />
            <DynamicElementRenderers />
        </>
    );
});

WebsiteDataInjection.displayName = "WebsiteDataInjection";
