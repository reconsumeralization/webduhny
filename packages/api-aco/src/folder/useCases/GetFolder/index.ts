import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { GetFolder } from "./GetFolder";
import { GetFolderWithFolderLevelPermissions } from "./GetFolderWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

interface GetFolderUseCasesParams {
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderUseCase = (params: GetFolderUseCasesParams) => {
    const getFolderUseCase = new GetFolder(params.getOperation);

    if (params.folderLevelPermissions.canUseFolderLevelPermissions()) {
        const getFolderUseCaseWithFlp = new GetFolderWithFolderLevelPermissions(
            params.folderLevelPermissions,
            getFolderUseCase
        );

        return {
            getFolderUseCase: getFolderUseCaseWithFlp
        };
    }

    return {
        getFolderUseCase
    };
};
