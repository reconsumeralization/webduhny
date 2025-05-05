import type {
    FolderLevelPermission as IFolderLevelPermission,
    FolderPermission
} from "~/flp/flp.types";

export class Permissions {
    public static create(
        permissions?: FolderPermission[],
        parentFlp?: Pick<IFolderLevelPermission, "id" | "permissions"> | null
    ): FolderPermission[] {
        const folderPermissions = permissions ?? [];

        // No permissions from the parent, let's return the permissions provided by the folder.
        if (!parentFlp || !parentFlp.permissions?.length) {
            return folderPermissions;
        }

        const { id: parentId, permissions: parentPermissions } = parentFlp;

        // Remove all previously inherited permissions
        const cleanedPermissions = folderPermissions.filter(
            p => p.inheritedFrom !== `parent:${parentId}`
        );

        // Store the `target` values from the current cleaned permissions.
        // These will be used to exclude inherited permissions that target the same entities as the current folder's permissions.
        const permissionsTargets = new Set(cleanedPermissions.map(p => p.target));

        // Get inherited permissions from parent, preserving the original inheritance chain
        const inheritedPermissions = parentPermissions
            .filter(p => !permissionsTargets.has(p.target))
            .map(p => ({
                ...p,
                // If the permission was already inherited, keep its original source
                inheritedFrom: `parent:${parentId}`
            }));

        return [...cleanedPermissions, ...inheritedPermissions];
    }
}
