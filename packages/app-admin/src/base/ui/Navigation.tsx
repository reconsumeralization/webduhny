import React from "react";
import { createVoidComponent, makeDecoratable } from "@webiny/app";

export const Navigation = makeDecoratable("Navigation", () => {
    return <NavigationRenderer />;
});

export const NavigationRenderer = makeDecoratable("NavigationRenderer", createVoidComponent());
