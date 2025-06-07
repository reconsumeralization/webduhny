import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid";
import { css } from "emotion";
import { restGridStyles } from "../publishingWorkflows/components/Styled";
import { ContentReviewDataList } from "./ContentReviewDataList";

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

interface LayoutCenterProps {
    children: React.ReactNode;
}

const LayoutCenter = ({ children }: LayoutCenterProps) => {
    return (
        <Grid className={restGridStyles}>
            <Cell span={3} />
            <Cell span={6} className={leftPanel}>
                {children}
            </Cell>
            <Cell span={3} />
        </Grid>
    );
};

export function ContentReviewDashboard() {
    return (
        <LayoutCenter>
            <ContentReviewDataList />
        </LayoutCenter>
    );
}
