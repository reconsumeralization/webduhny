import React from "react";
import { Provider } from "@webiny/app-admin";
import { SidebarProvider } from "./Navigation/SidebarProvider";
import { Navigation as DecoratedNavigation } from "./Navigation/Navigation";

export const Navigation = () => {
    return (
        <>
            <Provider hoc={SidebarProvider} />
            <DecoratedNavigation />
        </>
    );
};
