import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { uiLayoutPlugin } from "~/plugins/uiLayoutRenderer";
import { Menus } from "./Base/Menus";
import { Routes } from "./Base/Routes";
import { Tenant } from "./Base/Tenant";
import { AdminConfigProvider } from "~/config/AdminConfig";

const BaseExtension = () => {
    plugins.register([uiLayoutPlugin]);

    return (
        <>
            <AdminConfigProvider />
            <Tenant />
            <Menus />
            <Routes />
        </>
    );
};

export const Base = memo(BaseExtension);
