import type {
    FolderLevelPermission as IFolderLevelPermission,
    FolderPermission
} from "~/flp/flp.types";

export class Permissions {
    public static create(
        permissions?: FolderPermission[],
        parentFlp?: Pick<IFolderLevelPermission, "id" | "permissions"> | null
    ): FolderPermission[] {
        const currentFolderPermissions = permissions ?? [];
        const parentFolderPermissions = parentFlp?.permissions || [];

        // If there are no parent folder permissions, we can return the current folder permissions.
        if (!parentFolderPermissions.length) {
            return currentFolderPermissions;
        }

        // Merge parent and current folder permissions:
        // - current folder permissions take precedence over parent permissions
        // - only if parent permission's level is set to `no-access`, then we ignore the current folder permission
        const parentInheritedPermissions: FolderPermission[] = [];

        for (const parentPermission of parentInheritedPermissions) {
            if (parentPermission.level === "no-access") {
                parentInheritedPermissions.push({
                    ...parentPermission,
                    inheritedFrom: `parent:${parentFlp!.id}`
                });
                continue;
            }

            const overridePermissionExistsOnCurrentFolder = currentFolderPermissions.some(
                permission => permission.target === parentPermission.target
            );

            if (overridePermissionExistsOnCurrentFolder) {
                continue;
            }

            parentInheritedPermissions.push({
                ...parentPermission,
                inheritedFrom: `parent:${parentFlp!.id}`
            });
        }

        // Add current folder permissions that are not present in the parent folder permissions
        const applicableCurrentFolderPermissions = currentFolderPermissions.filter(
            permission => !parentFolderPermissions.some(p => p.target === permission.target)
        );

        return [...parentInheritedPermissions, ...applicableCurrentFolderPermissions];
    }
}
