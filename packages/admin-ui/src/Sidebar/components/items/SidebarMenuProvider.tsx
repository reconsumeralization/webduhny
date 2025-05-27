import React from "react";

interface SidebarMenuContext {
    currentLevel: number;
    nextLevel: number;
}

interface SidebarMenuProviderProps {
    level?: number;
    children: React.ReactNode;
}

const SidebarMenuContext = React.createContext<SidebarMenuContext>({
    currentLevel: 0,
    nextLevel: 1
});

function useSidebarMenu() {
    const context = React.useContext(SidebarMenuContext);
    if (!context) {
        throw new Error("useSidebarItem must be used within a SidebarMenuProvider.");
    }

    return context;
}

const SidebarMenuProvider = ({ level = 0, children }: SidebarMenuProviderProps) => {
    return (
        <SidebarMenuContext.Provider value={{ currentLevel: level, nextLevel: level + 1 }}>
            {children}
        </SidebarMenuContext.Provider>
    );
};

SidebarMenuProvider.displayName = "SidebarMenuProvider";

export { SidebarMenuProvider, useSidebarMenu };
