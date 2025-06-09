import React from "react";
import { SidebarHeader } from "~/admin/components/ContentEntries/SidebarHeader";
import { SidebarContent } from "~/admin/components/ContentEntries/SidebarContent";
import { SidebarFooter } from "~/admin/components/ContentEntries/SidebarFooter/SidebarFooter";

export const Sidebar = () => {
    return (
        <div className={"wby-flex wby-flex-col wby-h-main-content"}>
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </div>
    );
};
