import React from "react";
import { cn } from "@webiny/admin-ui";

interface OverlayContentProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
}

const OverlayContent = ({ visible, className, style, children, ...props }: OverlayContentProps) => {
    return (
        <div
            data-state={visible ? "open" : "closed"}
            className={cn(
                [
                    "wby-fixed wby-inset-x-0 wby-top-lg wby-z-20",
                    "wby-w-screen",
                    "wby-rounded-t-lg wby-overflow-hidden",
                    "wby-bg-neutral-base",
                    "wby-transition wby-ease-in-out",
                    "data-[state=open]:wby-animate-in data-[state=open]:wby-slide-in-from-bottom data-[state=open]:wby-fade-in data-[state=open]:wby-duration-500",
                    "data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out data-[state=closed]:wby-duration-150"
                ],
                className
            )}
            style={{ ...style, height: "calc(100vh - 24px)" }}
            {...props}
        >
            {children}
        </div>
    );
};

export { OverlayContent, type OverlayContentProps };
