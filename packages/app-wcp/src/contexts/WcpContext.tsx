import React from "react";
import type { ILicense } from "@webiny/wcp/types";
import { NullLicense } from "@webiny/wcp";

export type WcpContext = ILicense;

export interface WcpProviderProps {
    project: ILicense;
    children: React.ReactNode;
}

export const WcpContext = React.createContext<ILicense>(new NullLicense());

export const WcpContextProvider = (props: WcpProviderProps) => {
    const { children, project } = props;

    return <WcpContext.Provider value={project}>{children}</WcpContext.Provider>;
};
