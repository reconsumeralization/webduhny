import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Tabs } from "@webiny/ui/Tabs";
import { Sidebar } from "./Sidebar";
import { SidebarHighlight } from "./SidebarHighlight";
import { cn } from "@webiny/admin-ui";

export interface LayoutProps {
    className?: string;
}

export const Layout = makeDecoratable("SidebarLayout", ({ className }: LayoutProps) => {
    const { activeGroup, setActiveGroup } = Sidebar.useActiveGroup();

    return (
        <div
            className={cn(
                "wby-fixed wby-top-headerbar wby-right-0 wby-h-[calc(100vh-theme(height.headerbar))] wby-bg-neutral-base wby-w-[300px]",
                className
            )}
            data-role={"sidebar-layout"}
        >
            <Tabs value={activeGroup} onActivate={setActiveGroup} spacing={"md"}>
                <Sidebar.Elements group="groups" />
            </Tabs>
            <SidebarHighlight />
        </div>
    );
});
