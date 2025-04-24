import type {
    FolderLevelPermission as IFolderLevelPermission,
    FolderPermission
} from "~/flp/flp.types";

export class Permissions {
    public create(
        permissions?: FolderPermission[],
        parentFlp?: IFolderLevelPermission | null
    ): FolderPermission[] {
        const folderPermissions = permissions ?? [];

        // No permissions from the parent, let's return the permissions provided by the folder.
        if (!parentFlp) {
            return folderPermissions;
        }

        const { id: parentId, permissions: parentPermissions = [] } = parentFlp;

        // Remove all previously inherited permissions (from this specific parent)
        const cleanedPermissions = folderPermissions.filter(
            p => p.inheritedFrom !== `parent:${parentId}`
        );

        // Store the `target` values from the current cleaned permissions.
        // These will be used to exclude inherited permissions that target the same entities as the current folder's permissions.
        const permissionsTargets = new Set(cleanedPermissions.map(p => p.target));

        const inheritedPermissions = parentPermissions
            .filter(p => !permissionsTargets.has(p.target))
            .map(p => ({
                ...p,
                inheritedFrom: `parent:${parentId}`
            }));

        return [...cleanedPermissions, ...inheritedPermissions];
    }
}
