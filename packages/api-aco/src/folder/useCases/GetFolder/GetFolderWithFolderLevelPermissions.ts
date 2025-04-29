import { NotAuthorizedError } from "@webiny/api-security";
import type { IGetFolder } from "./IGetFolder";
import { FolderLevelPermissions } from "~/flp";
import type { GetFolderParams } from "~/folder/folder.types";

export class GetFolderWithFolderLevelPermissions implements IGetFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IGetFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IGetFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: GetFolderParams) {
        const folder = await this.decoretee.execute(params);
        const flp = await this.folderLevelPermissions.getFolderLevelPermission(folder.id);

        const folderWithFlp = {
            ...folder,
            permissions: flp.permissions
        };

        // Let's check if the current user has read access level.
        const canAccessFolder = await this.folderLevelPermissions.canReadFolder(folderWithFlp);

        if (!canAccessFolder) {
            throw new NotAuthorizedError();
        }

        return folderWithFlp;
    }
}
