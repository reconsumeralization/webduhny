import React, { useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { useRenderer } from "@webiny/app-page-builder-elements";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";

interface ContainerContextValue {
    funnelVm: FunnelVm;
    funnelSubmissionVm: FunnelSubmissionVm;
}

const createInitialContextValue = (): ContainerContextValue => {
    const funnelVm = new FunnelVm();
    const funnelSubmissionVm = new FunnelSubmissionVm(funnelVm.funnel);

    return {
        funnelVm,
        funnelSubmissionVm
    };
};

const ContainerContext = React.createContext<ContainerContextValue>(createInitialContextValue());

export interface ContainerProviderProps {
    children: React.ReactNode;

    // Used only within the Admin (editor) renderer.
    updateElementData?: (data: FunnelModelDto) => void;
}

// @ts-ignore
const globalContainer: { current: ContainerContextValue } = { current: createInitialContextValue() };

export const ContainerProvider = ({
    children,
    updateElementData = () => undefined
}: ContainerProviderProps) => {
    const { getElement } = useRenderer();
    const element = getElement<FunnelModelDto>();

    // 1. FunnelVm.
    const funnelVm = useMemo(() => {
        return new FunnelVm(element.data);
    }, []);

    useEffect(() => {
        return funnelVm.subscribe(updateElementData);
    }, [funnelVm, updateElementData]);

    useSyncExternalStore(funnelVm.subscribe.bind(funnelVm), funnelVm.getChecksum.bind(funnelVm));

    // 2. FunnelSubmissionVm.
    const funnelSubmissionVm = useMemo(() => {
        return new FunnelSubmissionVm(funnelVm.funnel);
    }, [funnelVm.getChecksum()]);

    const value = useMemo(() => {
        return {
            funnelVm,
            funnelSubmissionVm
        };
    }, [funnelVm, funnelSubmissionVm]);

    useEffect(() => {
        Object.assign(globalContainer.current, value)
    }, [value]);

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

export const getContainerStore = () => {
    return globalContainer.current;
};
