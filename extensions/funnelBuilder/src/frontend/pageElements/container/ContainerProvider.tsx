import React, { useContext, useMemo } from "react";
import { ContainerElementData } from "./types";
import { useRenderer } from "@webiny/app-page-builder-elements";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModelDto } from "../models/FunnelModel";

interface ContainerContextValue {
    funnelVm: FunnelVm | undefined;
}

const ContainerContext = React.createContext<ContainerContextValue>({
    funnelVm: undefined
});

export interface ContainerProviderProps {
    children: React.ReactNode;

    // Used only within the Admin (editor) renderer.
    updateElementData?: (data: FunnelModelDto) => void;
}

export const ContainerProvider = ({
    children,
    updateElementData = () => undefined
}: ContainerProviderProps) => {
    const { getElement } = useRenderer();
    const element = getElement<ContainerElementData>();

    const funnelVm = useMemo(() => {
        return new FunnelVm(element.data, {
            onChange: updateElementData
        });
    }, [element.data]);

    return <ContainerContext.Provider value={{ funnelVm }}>{children}</ContainerContext.Provider>;
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
    return useContext(ContainerContext);
};
