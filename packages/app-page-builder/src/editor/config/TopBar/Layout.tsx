import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import {cn, HeaderBar} from "@webiny/admin-ui";
import { TopBar } from "./TopBar";

export interface TopBarLayoutProps {
    className?: string;
}

export const Layout = makeDecoratable("TopBarLayout", ({className}: TopBarLayoutProps) => {
    return (
        <HeaderBar
            className={cn("wby-fixed wby-top-0 wby-z-[100] wby-pl-lg wby-pr-sm", className)}
            data-role={"top-bar-layout"}
            start={<TopBar.Elements group={"left"} />}
            middle={<TopBar.Elements group={"center"} />}
            end={<TopBar.Elements group={"actions"} />}
        />
    );
});
