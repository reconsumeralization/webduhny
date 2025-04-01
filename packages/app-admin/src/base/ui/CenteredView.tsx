import React from "react";
import { makeDecoratable } from "~/index";

export interface CenteredViewProps {
    children: React.ReactNode;
    maxWidth?: number | string;
}

export const CenteredView = makeDecoratable(
    "CenteredView",
    ({ maxWidth, children }: CenteredViewProps) => {
        return (
            <div className={"wby-container"} style={{ maxWidth }}>
                {children}
            </div>
        );
    }
);
