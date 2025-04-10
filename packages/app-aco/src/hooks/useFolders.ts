import {
    useCreateFolder,
    useDeleteFolder,
    useGetDescendantFolders,
    useGetFolder,
    useGetFolderLevelPermission,
    useListFolders,
    useUpdateFolder
} from "~/features";

/**
 * Custom hook to manage folder operations.
 *
 * @deprecated This hook is deprecated. Use the individual hooks directly from "~/features" instead.
 */
export const useFolders = () => {
    const { createFolder } = useCreateFolder();
    const { deleteFolder } = useDeleteFolder();
    const { listFolders, folders, loading } = useListFolders();
    const { updateFolder } = useUpdateFolder();
    const { getDescendantFolders } = useGetDescendantFolders();
    const { getFolder } = useGetFolder();
    const { getFolderLevelPermission: canManageStructure } =
        useGetFolderLevelPermission("canManageStructure");
    const { getFolderLevelPermission: canManagePermissions } =
        useGetFolderLevelPermission("canManagePermissions");
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    console.warn(
        "useFolders() hook is deprecated. Please use the appropriate feature-based hooks instead. Learn more: https://webiny.link/app-aco-folders-features"
    );

    return {
        folders,
        loading,
        listFolders,
        getFolder,
        getDescendantFolders,
        createFolder,
        updateFolder,
        deleteFolder,
        folderLevelPermissions: {
            canManageStructure,
            canManagePermissions,
            canManageContent
        }
    };
};
