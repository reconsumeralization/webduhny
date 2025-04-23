import WError from "@webiny/error";
import type {
    AcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission as IFolderLevelPermission,
    FolderPermission
} from "~/flp/flp.types";
import type { AcoContext, Folder } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export class GetFlp {
    private operations: AcoFolderLevelPermissionsStorageOperations;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
    }

    public async getFromFolder(
        folder: Folder,
        context: AcoContext
    ): Promise<IFolderLevelPermission> {
        const { parentId, id, type, slug, permissions = [] } = folder;
        const tenant = this.getTenantId(context);
        const locale = this.getLocaleCode(context);

        let parentFlp: IFolderLevelPermission | undefined = undefined;

        if (parentId) {
            const parent = await this.operations.get({
                where: { tenant, locale, type, id: parentId }
            });

            if (!parent) {
                throw new WError(
                    `Cannot find parent FLP record with id ${parentId}.`,
                    "FLP_CANNOT_GET_PARENT_FLP_FROM_FOLDER"
                );
            }

            parentFlp = parent;
        }

        return {
            tenant,
            locale,
            id,
            type,
            slug,
            parentId: parentId ?? ROOT_FOLDER,
            path: this.getPath(slug, parentFlp?.path),
            permissions: this.getPermissions(permissions, parentFlp)
        };
    }

    public async getFromFlp(
        flp: IFolderLevelPermission,
        context: AcoContext
    ): Promise<IFolderLevelPermission> {
        const { parentId, type, permissions, slug } = flp;
        const tenant = this.getTenantId(context);
        const locale = this.getLocaleCode(context);

        let parentFlp: IFolderLevelPermission | undefined = undefined;

        if (parentId) {
            const parent = await this.operations.get({
                where: { tenant, locale, type, id: parentId }
            });

            if (!parent) {
                throw new WError(
                    `Parent FLP record not found for node ${flp.id} with parentId ${flp.parentId}.`,
                    "FLP_CANNOT_GET_PARENT_FLP_FROM_FLP"
                );
            }

            parentFlp = parent;
        }

        return {
            ...flp,
            path: this.getPath(slug, parentFlp?.path),
            permissions: this.getPermissions(permissions, parentFlp)
        };
    }

    private getTenantId(context: AcoContext) {
        const tenant = context.tenancy.getCurrentTenant();
        if (!tenant) {
            throw new WError("Missing tenant in context.", "FLP_MISSING_TENANT");
        }
        return tenant.id;
    }

    private getLocaleCode(context: AcoContext) {
        const locale = context.i18n.getContentLocale();
        if (!locale) {
            throw new WError("Missing content locale in context.", "FLP_MISSING_LOCALE");
        }
        return locale.code;
    }

    private getPath(slug: string, parentPath?: string) {
        if (parentPath) {
            return `${parentPath}/${slug}`;
        }

        return `${ROOT_FOLDER}/${slug}`;
    }

    private getPermissions(
        permissions: FolderPermission[],
        parentFlp?: IFolderLevelPermission
    ): FolderPermission[] {
        // No permissions from the parent, let's return the permissions provided by the folder.
        if (!parentFlp) {
            return permissions;
        }

        const { id: parentId, permissions: parentPermissions = [] } = parentFlp;

        // Remove all previously inherited permissions (from this specific parent)
        const cleanedPermissions = permissions.filter(
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
