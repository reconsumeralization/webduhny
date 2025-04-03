import React from "react";
import { cn } from "~/utils";
import { SIDEBAR_TRANSITION_DURATION } from "./constants";
import { SidebarCache } from "./SidebarCache";

type SidebarContext = {
    state: "expanded" | "collapsed";
    expanded: boolean;
    pinned: boolean;
    transition: null | "expanding" | "collapsing";
    setExpanded: (expanded: boolean) => void;
    toggleExpanded: () => void;
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
    transition: null | "expanding" | "collapsing";
    pinned: boolean;
}

const createInitialSidebarState = (): SidebarState => {
    const { pinned } = SidebarCache.get();
    return {
        expanded: pinned, // If pinned, we want the sidebar to be open by default.
        pinned,
        transition: null
    };
};

const SidebarProvider = ({ className, children, ...props }: SidebarProviderProps) => {
    const [sidebarState, setSidebarState] = React.useState<SidebarState>(createInitialSidebarState);

    // With this timeout, we prevent the sidebar glitching (quickly opening/closing) during mouse enter/leave events.
    const timeoutRef = React.useRef<number | null>(null);

    const { expanded, transition, pinned } = sidebarState;

    const setExpanded = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const newValue = typeof value === "function" ? value(expanded) : value;
            setSidebarState(state => ({
                ...state,
                expanded: newValue,
                transition: newValue ? "expanding" : "collapsing"
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
            const newValue = typeof value === "function" ? value(pinned) : value;
            setSidebarState(state => ({
                ...state,
                pinned: newValue
            }));

            SidebarCache.set({ pinned: newValue });
        },
        [pinned]
    );

    const toggleExpanded = React.useCallback(() => {
        return setExpanded(prev => !prev);
    }, [setExpanded]); // Helper to toggle the sidebar.

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
            expanded,
            pinned,
            setExpanded,
            setPinned,
            toggleExpanded,
            togglePinned
        }),
        [state, transition, expanded, pinned, setExpanded, setPinned, toggleExpanded, togglePinned]
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
