import React, { useContext, useMemo } from "react";
import { ContainerElementData } from "./types";
import { useRenderer } from "@webiny/app-page-builder-elements";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";
import { FunnelSubmissionModel } from "../../../shared/models/FunnelSubmissionModel";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";

interface ContainerContextValue {
    funnelVm: FunnelVm | undefined;
    funnelSubmissionVm: FunnelSubmissionVm | undefined;
}

const ContainerContext = React.createContext<ContainerContextValue>({
    funnelVm: undefined,
    funnelSubmissionVm: undefined
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

    const funnelSubmissionVm = useMemo(() => {
        return new FunnelSubmissionVm(funnelVm.funnel);
    }, [funnelVm.funnel]);

    return (
        <ContainerContext.Provider value={{ funnelVm, funnelSubmissionVm }}>
            {children}
        </ContainerContext.Provider>
    );
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
    return useContext(ContainerContext);
};
