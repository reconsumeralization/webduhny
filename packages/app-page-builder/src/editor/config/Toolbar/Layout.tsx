import React from "react";
import styled from "@emotion/styled";
import { Toolbar } from "./Toolbar";
import { useDrawers } from "./Drawers/DrawersProvider";
import { DrawerProvider } from "./Drawers/DrawerProvider";

const ToolbarDrawerContainer = styled("div")({
    top: 64,
    left: 0,
    position: "fixed",
    backgroundColor: "var(--mdc-theme-surface)",
    zIndex: 2
});

const ToolbarActions = styled("div")({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
});

export const Layout = () => {
    const { drawers } = useDrawers();

    return (
        <>
            <ToolbarDrawerContainer data-role={"toolbar-drawers"}>
                {drawers.map(drawer => (
                    <DrawerProvider key={drawer.id} drawer={drawer}>
                        {drawer.element}
                    </DrawerProvider>
                ))}
            </ToolbarDrawerContainer>
            <div
                data-role={"toolbar-layout"}
                className={
                    "wby-fixed wby-top-headerbar wby-left-0 wby-p-xs wby-h-[calc(100vh-theme(height.headerbar))] wby-bg-neutral-base"
                }
            >
                <ToolbarActions data-role={"toolbar-actions"}>
                    <div className={"wby-flex wby-flex-col"}>
                        <Toolbar.Elements group={"top"} />
                    </div>
                    <div className={"wby-flex wby-flex-col"}>
                        <Toolbar.Elements group={"bottom"} />
                    </div>
                </ToolbarActions>
            </div>
        </>
    );
};
