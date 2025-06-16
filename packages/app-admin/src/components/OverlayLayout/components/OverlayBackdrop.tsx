import React from "react";
import { cn } from "@webiny/admin-ui";

interface OverlayBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    hideOverlay: () => void;
}

const OverlayBackdrop = ({ hideOverlay, visible }: OverlayBackdropProps) => {
    return (
        <div
            onClick={hideOverlay}
            data-state={visible ? "open" : "closed"}
            className={cn(
                "wby-fixed wby-inset-0 wby-z-15 wby-bg-neutral-dark/50",
                "wby-transition wby-ease-in-out",
                "data-[state=open]:wby-animate-in data-[state=open]:wby-fade-in data-[state=open]:wby-duration-500",
                "data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out data-[state=closed]:wby-duration-150"
            )}
        />
    );
};

export { OverlayBackdrop, type OverlayBackdropProps };
