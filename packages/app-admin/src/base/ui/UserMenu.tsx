import React from "react";
import { createVoidComponent, makeDecoratable } from "@webiny/app";

export * from "./UserMenu/UserMenuItem";
export * from "./UserMenu/UserMenuLink";
export * from "./UserMenu/UserMenuSeparator";

// UserMenu
export const UserMenu = makeDecoratable("UserMenu", () => {
    return <UserMenuRenderer />;
});

export const UserMenuRenderer = makeDecoratable("UserMenuRenderer", createVoidComponent());

// UserMenuHandle
export const UserMenuHandle = makeDecoratable("UserMenuHandle", () => {
    return <UserMenuHandleRenderer />;
});

export const UserMenuHandleRenderer = makeDecoratable(
    "UserMenuHandleRenderer",
    createVoidComponent()
);
