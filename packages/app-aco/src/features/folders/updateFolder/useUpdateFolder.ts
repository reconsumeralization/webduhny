import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { UpdateFolderGqlGateway } from "./UpdateFolderGqlGateway";
import { UpdateFolder } from "./UpdateFolder";
import { UpdateFolderParams } from "./IUpdateFolderUseCase";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";

export const useUpdateFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new UpdateFolderGqlGateway(client, fields);

    const updateFolder = useCallback(
        (params: UpdateFolderParams) => {
            const instance = UpdateFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        updateFolder
    };
};
