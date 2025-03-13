import React from "react";
import { cn } from "~/utils";
import { SidebarMenuProvider, useSidebarMenu } from "./SidebarMenuProvider";

const SidebarMenuSub = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
    const parentSidebarMenu = useSidebarMenu();

    return (
        <SidebarMenuProvider level={parentSidebarMenu.nextLevel}>
            <ul
                data-sidebar="menu-sub"
                className={cn(
                    "wby-flex wby-min-w-0 wby-flex-col wby-gap-y-xs wby-pt-xs",
                    "group-data-[state=collapsed]:wby-hidden",
                    className
                )}
                {...props}
            />
        </SidebarMenuProvider>
    );
};

export { SidebarMenuSub };
