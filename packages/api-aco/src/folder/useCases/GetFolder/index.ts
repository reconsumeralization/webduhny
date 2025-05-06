import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { GetFolder } from "./GetFolder";
import { GetFolderWithFolderLevelPermissions } from "./GetFolderWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

interface GetFolderUseCasesParams {
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderUseCase = (params: GetFolderUseCasesParams) => {
    const getFolder = new GetFolder(params.getOperation);
    const getFolderUseCase = new GetFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        getFolder
    );

    return {
        getFolderUseCase,
        getFolderUseCaseWithoutPermissions: getFolder
    };
};
