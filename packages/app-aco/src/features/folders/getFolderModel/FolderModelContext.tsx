import React, { useState, useCallback, useMemo, useEffect } from "react";
import { autorun, toJS } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { CircularProgress } from "@webiny/ui/Progress";
import { FolderModelDto } from "~/features";
import { GetFolderModelGqlGateway } from "~/features/folders/getFolderModel/GetFolderModelGqlGateway";
import { GetFolderModel } from "~/features/folders/getFolderModel/GetFolderModel";
import { Decorator, GenericComponent, Plugin } from "@webiny/app";

export const FolderModelContext = React.createContext<FolderModelDto | undefined>(undefined);

const acoFolderModelProvider: Decorator<
    GenericComponent<{ children: React.ReactNode }>
> = Original => {
    return function AcoFolderProvider({ children }) {
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

        return (
            <FolderModelContext.Provider value={model}>
                <Original>{children}</Original>
            </FolderModelContext.Provider>
        );
    };
};

export const FolderModelProviderModule = () => {
    return <Plugin providers={[acoFolderModelProvider]} />;
};
