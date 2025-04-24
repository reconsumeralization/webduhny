import { GetFolder } from "~/folder/useCases/GetFolder/GetFolder";
import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { GetFolderWithFolderLevelPermissions } from "~/folder/useCases/GetFolder/GetFolderWithFolderLevelPermissions";
import type { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";

interface GetFolderUseCasesParams {
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderUseCase = (params: GetFolderUseCasesParams) => {
    const getFolderUseCase = new GetFolder(params.getOperation);

    const getFolderUseCaseWithFlp = new GetFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        getFolderUseCase
    );

    return {
        getFolderUseCase: getFolderUseCaseWithFlp
    };
};
