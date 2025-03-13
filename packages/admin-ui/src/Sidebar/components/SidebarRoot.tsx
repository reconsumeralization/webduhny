import React, { useRef } from "react";
import { cn } from "~/utils";
import { useSidebar } from "./SidebarProvider";

interface SidebarRootProps extends React.ComponentProps<"div"> {
    side?: "left" | "right";
}

const SidebarRoot = ({ side = "left", className, children, ...props }: SidebarRootProps) => {
    const { state } = useSidebar();

    const elementRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={elementRef}
            className="wby-group wby-peer wby-block wby-border-r-sm wby-border-neutral-dimmed wby-bg-neutral-light"
            data-state={state}
            data-sidebar={"root"}
            data-side={side}
        >
            <div
                className={cn(
                    "wby-duration-200 wby-relative wby-h-svh wby-w-[--sidebar-width] wby-bg-transparent wby-transition-[width] wby-ease-linear",
                    "group-data-[side=right]:wby-rotate-180",
                    "group-data-[state=collapsed]:wby-w-[--sidebar-width-icon]"
                )}
            />
            <div
                className={cn(
                    "wby-duration-200 wby-fixed wby-inset-y-0 wby-z-10 wby-h-svh wby-w-[--sidebar-width] wby-transition-[width] wby-ease-linear md:wby-flex",
                    side === "left" ? "wby-left-0" : "wby-right-0",
                    "group-data-[state=collapsed]:wby-w-[--sidebar-width-icon] group-data-[side=left]:wby-border-r-px group-data-[side=right]:wby-border-l-px",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    className="wby-flex wby-h-full wby-w-full wby-py-xs wby-flex-col wby-bg-sidebar group-data-[variant=floating]:wby-rounded-lg group-data-[variant=floating]:wby-border group-data-[variant=floating]:wby-border-sidebar-border group-data-[variant=floating]:wby-shadow"
                >
                    {children}
                </div>
            </div>
            <div
                data-sidebar={"extra-hover-area"}
                className={
                    "wby-absolute wby-top-0 wby-left-[--sidebar-width-icon] wby-h-full wby-w-xl wby-hidden group-data-[state=collapsed]:wby-block"
                }
            />
        </div>
    );
};

export { SidebarRoot, type SidebarRootProps };
