import React from "react";

export interface DataListModalOverlayProps {
    children: React.ReactNode;
}

export const DataListModalOverlay = ({ children }: DataListModalOverlayProps) => {
    return <div data-testid={"data-list-modal-wrapper"}>{children}</div>;
};
