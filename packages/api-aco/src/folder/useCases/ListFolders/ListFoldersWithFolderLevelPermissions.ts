import type { Folder, ListFoldersParams } from "~/folder/folder.types";
import type { IListFolders } from "./IListFolders";
import { FolderLevelPermissions } from "~/flp";
import type { FolderPermission } from "~/flp/flp.types";
import { ROOT_FOLDER } from "~/constants";
import type { ListMeta } from "~/types";

export class ListFoldersWithFolderLevelPermissions implements IListFolders {
    private flpCatalog: Map<string, FolderPermission[]> = new Map();
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IListFolders;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IListFolders) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: ListFoldersParams): Promise<[Folder[], ListMeta]> {
        const [folders, meta] = await this.decoretee.execute(params);

        // Fetch FLP records for ROOT folders and populate the catalog.
        const rootFlps = await this.folderLevelPermissions.listFolderLevelPermissions({
            where: {
                type: params.where.type,
                parentId: ROOT_FOLDER
            }
        });

        rootFlps.forEach(flp => this.setFlp(flp.id, flp.permissions));

        // Fetch FLP for folders not already in the catalog.
        await Promise.all(
            folders.map(async folder => {
                if (!this.hasFlp(folder.id)) {
                    const permissions = await this.folderLevelPermissions.getFolderLevelPermissions(
                        folder.id
                    );
                    this.setFlp(folder.id, permissions);
                }
            })
        );

        // Filter folders based on permissions.
        const foldersWithPermissions = await Promise.all(
            folders.map(async folder => {
                const permissions = this.getFlp(folder.id);
                if (!permissions) {
                    return null;
                }

                const canAccessFolder = await this.folderLevelPermissions.canAccessFolder({
                    permissions,
                    rwd: "r"
                });

                if (!canAccessFolder) {
                    return null;
                }

                const folderWithFlp = { ...folder, permissions };
                return canAccessFolder ? folderWithFlp : null;
            })
        );

        return [foldersWithPermissions.filter(Boolean) as Folder[], meta];
    }

    private hasFlp(id: string) {
        return this.flpCatalog.has(id);
    }

    private getFlp(id: string) {
        return this.flpCatalog.get(id);
    }

    private setFlp(id: string, permissions: FolderPermission[]) {
        this.flpCatalog.set(id, permissions);
    }
}
