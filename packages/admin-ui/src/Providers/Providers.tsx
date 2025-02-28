import React from "react";
import { Toast } from "~/Toast";
import { Tooltip } from "~/Tooltip";

export interface ProvidersProps {
    children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <Tooltip.Provider>{children}</Tooltip.Provider>
            <Toast.Provider />
        </>
    );
};
