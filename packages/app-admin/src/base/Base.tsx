import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { uiLayoutPlugin } from "~/plugins/uiLayoutRenderer";
import { Menus } from "./Base/Menus";
import { Routes } from "./Base/Routes";

const BaseExtension = () => {
    plugins.register([uiLayoutPlugin]);

    return (
        <>
            <Menus />
            <Routes />
        </>
    );
};

export const Base = memo(BaseExtension);
