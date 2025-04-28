import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { ListFolders } from "./ListFolders";
import { ListFoldersWithFolderLevelPermissions } from "./ListFoldersWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

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
