import React from "react";
import { cn } from "@webiny/admin-ui";

export interface LayoutProps {
    className?: string;
    children: React.ReactNode;
}

export const Layout = ({ className, children }: LayoutProps) => {
    return (
        <div
            className={cn(
                "wby-m-[78px] wby-p-0 wby-absolute wby-w-[calc(100vw-415px)] wby-top-0 wby-box-border wby-z-1 wby-bg-white",
                className
            )}
            data-role={"content-layout"}
        >
            {children}
        </div>
    );
};
