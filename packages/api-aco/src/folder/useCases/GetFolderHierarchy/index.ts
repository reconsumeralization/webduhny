import { GetFolderHierarchy } from "./GetFolderHierarchy";
import { GetFolderHierarchyWithFolderLevelPermissions } from "./GetFolderHierarchyWithFolderLevelPermissions";
import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { FolderLevelPermissions } from "~/flp";

interface GetFolderHierarchyUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderHierarchyUseCases = (params: GetFolderHierarchyUseCasesParams) => {
    const getFolderHierarchy = new GetFolderHierarchy(params.listOperation, params.getOperation);
    const getFolderHierarchyUseCase = new GetFolderHierarchyWithFolderLevelPermissions(
        params.folderLevelPermissions,
        getFolderHierarchy
    );

    return {
        getFolderHierarchyUseCase
    };
};
