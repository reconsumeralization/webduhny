import React, { useState, useCallback, useMemo, useEffect } from "react";
import { autorun, toJS } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { CircularProgress } from "@webiny/ui/Progress";
import { FolderModelDto } from "~/features";
import { GetFolderModelGqlGateway } from "~/features/folders/getFolderModel/GetFolderModelGqlGateway";
import { GetFolderModel } from "~/features/folders/getFolderModel/GetFolderModel";

export const FolderModelContext = React.createContext<FolderModelDto | undefined>(undefined);

export const FolderModelProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useApolloClient();
    const gateway = new GetFolderModelGqlGateway(client);

    const [model, setModel] = useState<FolderModelDto | undefined>(undefined);

    const { useCase, repository } = useMemo(() => {
        return GetFolderModel.getInstance(gateway);
    }, [gateway]);

    const getFolderModel = useCallback(() => {
        return useCase.execute();
    }, [useCase]);

    useEffect(() => {
        if (model) {
            return;
        }

        getFolderModel();
    }, []);

    useEffect(() => {
        return autorun(() => {
            const model = repository.getModel();
            setModel(state => {
                if (model) {
                    return { ...toJS(model) };
                }
                return state;
            });
        });
    }, []);

    if (!model) {
        return <CircularProgress label={"Preparing Folders..."} />;
    }

    return <FolderModelContext.Provider value={model}>{children}</FolderModelContext.Provider>;
};
