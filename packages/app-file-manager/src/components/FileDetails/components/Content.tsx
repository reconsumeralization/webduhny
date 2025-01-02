import styled from "@emotion/styled";
import React from "react";

const Grow = styled.div<{ flex: number }>`
    flex: ${({ flex }) => flex};
    overflow-y: scroll;
    :last-of-type {
        border-left: 1px solid var(--mdc-theme-on-background);
    }
`;

interface ContentProps {
    children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
    return <div className={"flex"}>{children}</div>;
};

interface PanelProps {
    flex?: number;
    children: React.ReactNode;
}

const Panel = ({ flex, children }: PanelProps) => {
    return (
        <Grow data-role={"panel"} flex={flex ?? 1}>
            {children}
        </Grow>
    );
};

Content.Panel = Panel;
