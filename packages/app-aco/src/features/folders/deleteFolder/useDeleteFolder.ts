import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { DeleteFolderGqlGateway } from "./DeleteFolderGqlGateway";
import { DeleteFolderParams } from "./IDeleteFolderUseCase";
import { DeleteFolder } from "./DeleteFolder";
import { useFoldersType } from "~/hooks";

export const useDeleteFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const gateway = new DeleteFolderGqlGateway(client);

    const deleteFolder = useCallback(
        (params: DeleteFolderParams) => {
            const instance = DeleteFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        deleteFolder
    };
};
