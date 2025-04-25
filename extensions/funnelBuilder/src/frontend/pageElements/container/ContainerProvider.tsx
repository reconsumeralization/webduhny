import React, {useContext, useMemo, useSyncExternalStore} from "react";
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

export const ContainerProvider = ({
    children,
    updateElementData = () => undefined
}: ContainerProviderProps) => {
    const { getElement } = useRenderer();
    const element = getElement<FunnelModelDto>();

    // With this, we're forcing the funnel to be re-rendered when the data changes.
    const [funnelSubmissionActiveStepIndex, setFunnelSubmissionActiveStepIndex] =
        React.useState<number>(0);

    const funnelVm = useMemo(() => {
        return new FunnelVm(element.data, {
            onChange: updateElementData
        });
    }, [element.data]);

    const funnelSubmissionVm = useMemo(() => {
        return new FunnelSubmissionVm(funnelVm.funnel);
    }, [funnelVm]);

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
