import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderGqlGateway } from "./GetFolderGqlGateway";
import { GetFolderParams } from "./IGetFolderUseCase";
import { GetFolder } from "./GetFolder";
import { useFoldersType } from "~/hooks";

export const useGetFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const gateway = new GetFolderGqlGateway(client);

    const getFolder = useCallback(
        (params: GetFolderParams) => {
            const instance = GetFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        getFolder
    };
};
