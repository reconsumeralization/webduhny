import { NotAuthorizedError } from "@webiny/api-security";
import WError from "@webiny/error";
import type { AcoFolderStorageOperations, UpdateFolderParams } from "~/folder/folder.types";
import type { IUpdateFolder } from "./IUpdateFolder";
import { FolderLevelPermissions } from "~/flp";

export class UpdateFolderWithFolderLevelPermissions implements IUpdateFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];
    private readonly decoretee: IUpdateFolder;

    constructor(
        folderLevelPermissions: FolderLevelPermissions,
        getOperation: AcoFolderStorageOperations["getFolder"],
        decoretee: IUpdateFolder
    ) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(id: string, params: UpdateFolderParams) {
        const original = await this.getOperation({ id });
        const originalFlp = await this.folderLevelPermissions.getFolderLevelPermission(id);

        await this.folderLevelPermissions.ensureCanAccessFolder({
            permissions: originalFlp.permissions,
            rwd: "w"
        });

        // Validate data.
        if (Array.isArray(params.permissions)) {
            params.permissions.forEach(permission => {
                const targetIsValid =
                    permission.target.startsWith("admin:") || permission.target.startsWith("team:");
                if (!targetIsValid) {
                    throw new Error(`Permission target "${permission.target}" is not valid.`);
                }

                if (permission.inheritedFrom) {
                    throw new Error(`Permission "inheritedFrom" cannot be set manually.`);
                }
            });
        }

        // Parent change is not allowed if the user doesn't have access to the new parent.
        if (params.parentId && params.parentId !== original.parentId) {
            try {
                // Getting the parent folder FLP will throw an error if the user doesn't have access.
                const parentFlp = await this.folderLevelPermissions.getFolderLevelPermission(
                    params.parentId
                );

                if (parentFlp) {
                    await this.folderLevelPermissions.ensureCanAccessFolder({
                        permissions: parentFlp.permissions,
                        rwd: "r"
                    });
                }
            } catch (e) {
                if (e instanceof NotAuthorizedError) {
                    throw new WError(
                        `Cannot move folder to a new parent because you don't have access to the new parent.`,
                        "CANNOT_MOVE_FOLDER_TO_NEW_PARENT"
                    );
                }

                // If we didn't receive the expected error, we still want to throw it.
                throw e;
            }
        }

        const folder = await this.decoretee.execute(id, params);

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
