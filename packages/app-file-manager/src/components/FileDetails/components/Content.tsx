import React from "react";
import { cn } from "@webiny/admin-ui";

interface GrowProps {
    flex: number;
    className?: string;
}

const Grow = ({ flex, children, className }: React.PropsWithChildren<GrowProps>) => {
    return (
        <div
            className={cn(
                "wby-overflow-y-scroll last-of-type:wby-border-l-sm wby-border-neutral-dimmed",
                className
            )}
            style={{ flex }}
        >
            {children}
        </div>
    );
};

interface ContentProps {
    children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
    return <div className={"wby-flex wby-h-full"}>{children}</div>;
};

interface PanelProps {
    flex?: number;
    children: React.ReactNode;
    className?: string;
}

const Panel = ({ flex, children, className }: PanelProps) => {
    return (
        <Grow data-role={"panel"} flex={flex ?? 1} className={className}>
            {children}
        </Grow>
    );
};

Content.Panel = Panel;
