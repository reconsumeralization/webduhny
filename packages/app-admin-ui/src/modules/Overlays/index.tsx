import React from "react";
import { Provider } from "@webiny/app-admin";
import { DialogContainer } from "./Dialog";

interface OverlaysProps {
    children?: React.ReactNode;
}

/**
 * Dialogs require a container to be rendered, and we want to place it outside of
 * any other views that are constructed by developers. We need these 2 containers to always be
 * present, even if there is no <Layout> mounted.
 */
const OverlaysHOC = (Component: React.ComponentType<OverlaysProps>) => {
    return function Overlays({ children }: OverlaysProps) {
        return (
            <Component>
                {children}
                <DialogContainer />
            </Component>
        );
    };
};

export const Overlays = () => {
    return <Provider hoc={OverlaysHOC} />;
};
