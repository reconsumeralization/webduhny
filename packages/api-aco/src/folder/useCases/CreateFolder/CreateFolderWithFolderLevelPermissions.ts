import type { ICreateFolder } from "./ICreateFolder";
import type { CreateFolderParams } from "~/folder/folder.types";
import { NotAuthorizedError } from "@webiny/api-security";
import { FolderLevelPermissions } from "~/flp";
import WError from "@webiny/error";

export class CreateFolderWithFolderLevelPermissions implements ICreateFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: ICreateFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: ICreateFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: CreateFolderParams) {
        let canCreateFolder: boolean;
        if (params.parentId) {
            const parentFlp = await this.folderLevelPermissions.getFolderLevelPermission(
                params.parentId
            );

            if (!parentFlp) {
                throw new WError(
                    "Failed to retrieve folder level permissions (FLP) for the specified folder.",
                    "CREATE_FOLDER_WITH_FLP_ERROR",
                    {
                        params
                    }
                );
            }

            canCreateFolder = await this.folderLevelPermissions.canAccessFolder({
                flp: parentFlp,
                rwd: "w"
            });
        } else {
            canCreateFolder = this.folderLevelPermissions.canCreateFolderInRoot();
        }

        if (!canCreateFolder) {
            throw new NotAuthorizedError();
        }

        const folder = await this.decoretee.execute(params);

        // Let's set default permissions based on the current user.
        const permissionsWithDefaults = await this.folderLevelPermissions.getDefaultPermissions(
            folder?.permissions ?? []
        );

        return {
            ...folder,
            permissions: permissionsWithDefaults
        };
    }
}
