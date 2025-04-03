import React from "react";
import { cn } from "~/utils";
import { SIDEBAR_TRANSITION_DURATION } from "./constants";
import { SidebarCache } from "./SidebarCache";

type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    pinned: boolean;
    transition: null | "opening" | "closing";
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
    togglePinned: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
}

type SidebarProviderProps = React.HTMLAttributes<HTMLDivElement>;

interface SidebarState {
    expanded: boolean;
    transition: null | "opening" | "closing";
    pinned: boolean;
}

const createDefaultSidebarState = (): SidebarState => {
    const { pinned } = SidebarCache.get();
    return {
        expanded: pinned, // If pinned, we want the sidebar to be open by default.
        pinned,
        transition: null
    };
};

const SidebarProvider = ({ className, children, ...props }: SidebarProviderProps) => {
    const [sidebarState, setSidebarState] = React.useState<SidebarState>(createDefaultSidebarState);

    // With this timeout, we prevent the sidebar glitching (quickly opening/closing) during mouse enter/leave events.
    const timeoutRef = React.useRef<number | null>(null);

    const { expanded, transition, pinned } = sidebarState;

    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(expanded) : value;
            setSidebarState(state => ({
                ...state,
                expanded: openState,
                transition: openState ? "opening" : "closing"
            }));

            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            timeoutRef.current = window.setTimeout(() => {
                setSidebarState(state => ({
                    ...state,
                    transition: null
                }));
            }, SIDEBAR_TRANSITION_DURATION);
        },
        [expanded]
    );

    const setPinned = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const pinnedState = typeof value === "function" ? value(pinned) : value;
            setSidebarState(state => ({
                ...state,
                pinned: pinnedState
            }));

            SidebarCache.set({ pinned: pinnedState });
        },
        [pinned]
    );

    const toggleOpen = React.useCallback(() => {
        return setOpen(prev => !prev);
    }, [setOpen]); // Helper to toggle the sidebar.

    const togglePinned = React.useCallback(() => {
        return setPinned(prev => !prev);
    }, [setPinned]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = expanded ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
        () => ({
            state,
            transition,
            open: expanded,
            pinned,
            setOpen,
            setPinned,
            toggleOpen,
            togglePinned
        }),
        [state, transition, open, pinned, setOpen, setPinned, toggleOpen, togglePinned]
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
