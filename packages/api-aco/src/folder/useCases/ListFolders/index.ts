import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { ListFolders } from "./ListFolders";
import { ListFoldersWithFolderLevelPermissions } from "./ListFoldersWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

interface ListFoldersUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getListFoldersUseCases = (params: ListFoldersUseCasesParams) => {
    const listFolders = new ListFolders(params.listOperation);
    const listFoldersUseCase = new ListFoldersWithFolderLevelPermissions(
        params.folderLevelPermissions,
        listFolders
    );

    return {
        listFoldersUseCase,
        listFoldersUseCaseWithoutPermissions: listFolders
    };
};
