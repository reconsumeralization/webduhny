import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { CreateFolderGqlGateway } from "./CreateFolderGqlGateway";
import { CreateFolderParams } from "./ICreateFolderUseCase";
import { CreateFolder } from "./CreateFolder";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";

export const useCreateFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new CreateFolderGqlGateway(client, fields);

    const createFolder = useCallback(
        (params: CreateFolderParams) => {
            const instance = CreateFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        createFolder
    };
};
