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
        const permissions = await this.folderLevelPermissions.getFolderLevelPermissions(folder.id);

        // Let's check if the current user has read access level.
        const canAccessFolder = await this.folderLevelPermissions.canAccessFolder({
            permissions,
            rwd: "r"
        });

        if (!canAccessFolder) {
            throw new NotAuthorizedError();
        }

        return {
            ...folder,
            permissions
        };
    }
}
