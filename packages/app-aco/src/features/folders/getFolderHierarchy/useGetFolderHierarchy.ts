import { useCallback, useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderHierarchyGqlGateway } from "./GetFolderHierarchyGqlGateway";
import { GetFolderHierarchy } from "./GetFolderHierarchy";
import { FolderDtoMapper } from "./FolderDto";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";
import { FolderItem } from "~/types";

export const useGetFolderHierarchy = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new GetFolderHierarchyGqlGateway(client, fields);

    const [vm, setVm] = useState<{
        folders: FolderItem[];
        loading: Record<string, boolean>;
    }>({
        folders: [],
        loading: {
            INIT: true
        }
    });

    const {
        useCase,
        folders: foldersCache,
        loading
    } = useMemo(() => {
        return GetFolderHierarchy.getInstance(type, gateway);
    }, [type, gateway]);

    const getFolderHierarchy = useCallback(
        (id: string) => {
            return useCase.execute({ id });
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

    useEffect(() => {
        return autorun(() => {
            const loadingState = loading.get();

            console.log("loading", loadingState);

            setVm(vm => ({
                ...vm,
                loading: loadingState
            }));
        });
    }, [loading]);

    return {
        ...vm,
        getFolderHierarchy
    };
};
