import { useCallback, useEffect, useState, useMemo } from "react";
import { autorun, toJS } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderModelGqlGateway } from "./GetFolderModelGqlGateway";
import { FolderModelDto } from "./FolderModelDto";
import { GetFolderModel } from "~/features/folders/getFolderModel/GetFolderModel";

export const useGetFolderModel = () => {
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

    return { model, getFolderModel };
};
