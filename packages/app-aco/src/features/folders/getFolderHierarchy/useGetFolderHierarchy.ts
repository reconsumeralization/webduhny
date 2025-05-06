import { useCallback, useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderHierarchyGqlGateway } from "./GetFolderHierarchyGqlGateway";
import { GetFolderHierarchy } from "./GetFolderHierarchy";
import { FolderDtoMapper } from "./FolderDto";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";
import { FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export const useGetFolderHierarchy = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new GetFolderHierarchyGqlGateway(client, fields);

    const [vm, setVm] = useState<{
        folders: FolderItem[];
    }>({
        folders: []
    });

    const {
        useCase,
        folders: foldersCache,
        loading: loadingState
    } = useMemo(() => {
        return GetFolderHierarchy.getInstance(type, gateway);
    }, [type, gateway]);

    const getFolderHierarchy = useCallback(
        (id: string) => {
            return useCase.execute({ id });
        },
        [useCase]
    );

    const getIsFolderLoading = useCallback(
        (action = ROOT_FOLDER) => {
            if (!loadingState) {
                return true;
            }

            return loadingState.isLoading(action);
        },
        [loadingState]
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

    // useEffect(() => {
    //     return autorun(() => {
    //         const loading = loadingState.get();
    //         const hasLoading = Object.values(loading).some(Boolean);
    //         setVm(vm => ({
    //             ...vm,
    //             loading,
    //             hasLoading
    //         }));
    //     });
    // }, [loadingState]);

    return {
        ...vm,
        getFolderHierarchy,
        getIsFolderLoading
    };
};
