import { useCallback, useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { ListFoldersByParentIdsGqlGateway } from "./ListFoldersByParentIdsGqlGateway";
import { ListFoldersByParentIds } from "./ListFoldersByParentIds";
import { FolderDtoMapper } from "./FolderDto";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";
import { FolderItem } from "~/types";

export const useListFoldersByParentIds = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new ListFoldersByParentIdsGqlGateway(client, fields);

    const [vm, setVm] = useState<{
        folders: FolderItem[];
    }>({
        folders: []
    });

    const { useCase, folders: foldersCache } = useMemo(() => {
        return ListFoldersByParentIds.getInstance(type, gateway);
    }, [type, gateway]);

    const listFoldersByParentIds = useCallback(
        (parentIds?: string[]) => {
            return useCase.execute({ parentIds });
        },
        [useCase]
    );

    useEffect(() => {
        return autorun(() => {
            const folders = foldersCache.getItems().map(folder => FolderDtoMapper.toDTO(folder));

            setVm(vm => ({
                ...vm,
                folders
            }));
        });
    }, [foldersCache]);

    return {
        ...vm,
        listFoldersByParentIds
    };
};
