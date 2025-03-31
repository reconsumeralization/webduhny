import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { uiLayoutPlugin } from "~/plugins/uiLayoutRenderer";
import { Menus } from "./Base/Menus";
import { Routes } from "./Base/Routes";
import { Tenant } from "./Base/Tenant";

const BaseExtension = () => {
    plugins.register([uiLayoutPlugin]);

    return (
        <>
            <Tenant />
            <Menus />
            <Routes />
        </>
    );
};

export const Base = memo(BaseExtension);
