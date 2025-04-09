import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Tabs } from "@webiny/ui/Tabs";
import { Sidebar } from "./Sidebar";
import { SidebarHighlight } from "./SidebarHighlight";
import { cn } from "@webiny/admin-ui";

// const rightSideBar = css({
//     boxShadow: "1px 0px 5px 0px rgba(128,128,128,1)",
//     position: "fixed",
//     right: 0,
//     top: 65,
//     height: "100%",
//     width: 300,
//     zIndex: 1
// });

export interface LayoutProps {
    className?: string;
}

export const Layout = makeDecoratable("SidebarLayout", ({ className }: LayoutProps) => {
    const { activeGroup, setActiveGroup } = Sidebar.useActiveGroup();

    return (
        <div
            className={cn(
                "wby-fixed wby-top-headerbar wby-right-0 wby-p-xs wby-h-[calc(100vh-theme(height.headerbar))] wby-bg-neutral-base wby-w-[300px]",
                className
            )}
            data-role={"sidebar-layout"}
        >
            <Tabs value={activeGroup} onActivate={setActiveGroup}>
                <Sidebar.Elements group="groups" />
            </Tabs>
            <SidebarHighlight />
        </div>
    );
});
