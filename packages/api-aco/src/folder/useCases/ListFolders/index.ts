import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { ListFolders } from "~/folder/useCases/ListFolders/ListFolders";
import type { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";
import { ListFoldersWithFolderLevelPermissions } from "~/folder/useCases/ListFolders/ListFoldersWithFolderLevelPermissions";

interface ListFoldersUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getListFoldersUseCases = (params: ListFoldersUseCasesParams) => {
    const listFoldersUseCase = new ListFolders(params.listOperation);

    const listFoldersUseCaseWithFlp = new ListFoldersWithFolderLevelPermissions(
        params.folderLevelPermissions,
        listFoldersUseCase
    );

    return {
        listFoldersUseCase: listFoldersUseCaseWithFlp
    };
};
