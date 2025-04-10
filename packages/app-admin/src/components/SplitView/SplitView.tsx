import * as React from "react";
import classSet from "classnames";
import { CellProps } from "@webiny/ui/Grid";
import { cn, Separator } from "@webiny/admin-ui";
import { css } from "emotion";
import styled from "@emotion/styled";
import {
    Panel,
    PanelProps,
    PanelGroup,
    PanelResizeHandle,
    PanelGroupProps
} from "~/components/ResizablePanels";

const grid = css({
    "&.mdc-layout-grid": {
        padding: 0,
        margin: "-3px auto 0 auto",
        ">.mdc-layout-grid__inner": {
            gridGap: 0
        }
    }
});

const RightPanelWrapper = styled("div")({
    overflow: "auto",
    height: "calc(100vh - 45px)"
});

export const leftPanel = css({
    backgroundColor: "var(--mdc-theme-surface)",
    ">.webiny-data-list": {
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
        ".mdc-deprecated-list": {
            overflow: "auto"
        }
    },
    ">.mdc-deprecated-list": {
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 45px)",
        overflow: "auto"
    }
});

interface SplitViewProps extends Omit<PanelGroupProps, "direction" | "id" | "autoSaveId"> {
    layoutId?: string | null;
}

const SplitView = ({ children, className, layoutId, ...props }: SplitViewProps) => {
    return (
        <PanelGroup
            direction="horizontal"
            id="splitView"
            autoSaveId={layoutId}
            style={{ height: "auto" }}
            className={classSet(grid, className, "webiny-split-view")}
            {...props}
        >
            {children}
        </PanelGroup>
    );
};

// Get the default size for the panel:
const getDefaultSize = (span = 6) => {
    return (span / 12) * 100;
};

interface SplitViewPanelProps extends Omit<CellProps, "style">, Omit<PanelProps, "id"> {}

const LeftPanel = ({ children, className, ...props }: SplitViewPanelProps) => {
    const defaultSize = props.defaultSize ?? getDefaultSize(props.span || 5);

    return (
        <>
            <Panel
                defaultSize={defaultSize}
                minSize={10}
                id="leftPanel"
                className={cn("webiny-split-view__right-panel", className)}
                {...props}
            >
                {children}
            </Panel>
            <PanelResizeHandle>
                <Separator variant={"subtle"} orientation={"vertical"} margin={"none"} />
            </PanelResizeHandle>
        </>
    );
};

const RightPanel = ({ children, ...props }: SplitViewPanelProps) => {
    const defaultSize = props.defaultSize ?? getDefaultSize(props.span || 7);

    return (
        <Panel
            defaultSize={defaultSize}
            minSize={30}
            id="rightPanel"
            className={cn("webiny-split-view__right-panel", props.className)}
            {...props}
        >
            <RightPanelWrapper
                className={"webiny-split-view__right-panel-wrapper"}
                id={"webiny-split-view-right-panel"}
            >
                {children}
            </RightPanelWrapper>
        </Panel>
    );
};

export { SplitView, LeftPanel, RightPanel };
