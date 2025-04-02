import React from "react";
import { cn } from "~/utils";

import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE } from "./constants";

type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    pinned: boolean;
    setOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    togglePinSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
}

type SidebarProviderProps = {
    defaultOpen?: boolean;
    defaultPinned?: boolean;
    open?: boolean;
    pinned?: boolean;
    onOpenChange?: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const SidebarProvider = ({
    defaultOpen = false,
    defaultPinned = false,
    open: openProp,
    pinned: pinnedProp,
    onOpenChange: setOpenProp,
    className,
    children,
    ...props
}: SidebarProviderProps) => {
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const [_pinned, _setPinned] = React.useState(defaultPinned);
    const open = openProp ?? _open;
    const pinned = pinnedProp ?? _pinned;
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(open) : value;
            if (setOpenProp) {
                setOpenProp(openState);
            } else {
                _setOpen(openState);
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return setOpen(open => !open);
    }, [setOpen]); // Helper to toggle the sidebar.

    const togglePinSidebar = React.useCallback(() => {
        return _setPinned(pinned => !pinned);
    }, [_pinned]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
        () => ({
            state,
            open,
            pinned,
            setOpen,
            toggleSidebar,
            togglePinSidebar
        }),
        [state, open, setOpen, toggleSidebar, togglePinSidebar]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-sidebar={"provider"}
                {...props}
                className={cn(
                    "wby-group/sidebar-wrapper wby-flex wby-min-h-svh wby-w-full",
                    className
                )}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
};
SidebarProvider.displayName = "SidebarProvider";

export { SidebarProvider, useSidebar };
