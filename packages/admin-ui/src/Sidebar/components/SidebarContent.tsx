import React from "react";
import { cn } from "~/utils";

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            {...props}
            data-sidebar="content"
            className={cn(
                "wby-flex wby-text-neutral-primary wby-min-h-0 wby-flex-1 wby-flex-col wby-gap-2 wby-overflow-y-auto wby-overflow-x-hidden group-data-[state=collapsed]:wby-overflow-hidden",
                className
            )}
        />
    );
};

export { SidebarContent };
