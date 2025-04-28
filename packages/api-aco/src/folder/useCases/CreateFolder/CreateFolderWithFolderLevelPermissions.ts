import type { ICreateFolder } from "./ICreateFolder";
import type { AcoFolderStorageOperations, CreateFolderParams } from "~/folder/folder.types";
import { NotAuthorizedError } from "@webiny/api-security";
import { FolderLevelPermissions } from "~/flp";

export class CreateFolderWithFolderLevelPermissions implements ICreateFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];
    private readonly decoretee: ICreateFolder;

    constructor(
        folderLevelPermissions: FolderLevelPermissions,
        getOperation: AcoFolderStorageOperations["getFolder"],
        decoretee: ICreateFolder
    ) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(params: CreateFolderParams) {
        let canCreateFolder: boolean;
        if (params.parentId) {
            const parentFolder = await this.getOperation({ id: params.parentId });
            canCreateFolder = await this.folderLevelPermissions.canAccessFolder({
                folder: parentFolder,
                rwd: "w"
            });
        } else {
            canCreateFolder = await this.folderLevelPermissions.canCreateFolderInRoot();
        }

        if (!canCreateFolder) {
            throw new NotAuthorizedError();
        }

        return await this.decoretee.execute(params);
    }
}
