import React from "react";
import { Route as AppRoute } from "@webiny/app/config/RouterConfig/Route";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

export const Route = (props: React.ComponentProps<typeof AppRoute>) => {
    return (
        <RouterConfig>
            <AppRoute {...props} />
        </RouterConfig>
    );
};
