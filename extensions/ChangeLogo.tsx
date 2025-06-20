import React from "react";
import { AddLogo } from "@webiny/app-serverless-cms";

import logoPng from "./logo.png";

export const Extension = () => {
    return (
        <>
            <AddLogo logo={<img src={logoPng} height={40} width={40} />} />
        </>
    );
};