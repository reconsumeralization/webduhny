import React, { useContext, useEffect, useMemo } from "react";
import { FunnelBuilderVm } from "../viewModels/FunnelBuilderVm";

import { autorun } from "mobx";
interface ContainerContextValue {
    funnelBuilderVm: FunnelBuilderVm;
}

const ContainerContext = React.createContext<undefined | ContainerContextValue>(undefined);

export interface ContainerProviderProps {
    children: React.ReactNode;
    funnelBuilderVm: FunnelBuilderVm;
}

export const ContainerProvider = ({ children, funnelBuilderVm }: ContainerProviderProps) => {
    // @ts-ignore
    window.__funnelBuilderVm = funnelBuilderVm;

    return (
        <ContainerContext.Provider value={{ funnelBuilderVm }}>
            {children}
        </ContainerContext.Provider>
    );
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
    return useContext(ContainerContext);
};

export function useFunnelBuilder() {
    const container = useContainer();
    if (!container) {
        return;
    }

    const { funnelBuilderVm } = container;

    useEffect(() => {
        console.log('use effect mobx init')
        return autorun(() => {
            console.log("Funnel changed:", funnelBuilderVm.fieldsCount);
            console.log("Step count:", funnelBuilderVm.funnel.steps.length);
        });
    }, [funnelBuilderVm]);

    return container.funnelBuilderVm;
}

