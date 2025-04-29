import type { Folder, ListFoldersParams } from "~/folder/folder.types";
import type { IListFolders } from "./IListFolders";
import { FolderLevelPermissions } from "~/flp";
import type { FolderLevelPermission as IFolderLevelPermission } from "~/flp/flp.types";
import { ROOT_FOLDER } from "~/constants";
import type { ListMeta } from "~/types";

export class ListFoldersWithFolderLevelPermissions implements IListFolders {
    private flpCatalog: Map<string, IFolderLevelPermission> = new Map();
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

        rootFlps.forEach(flp => this.setFlp(flp.id, flp));

        // Fetch FLP for folders not already in the catalog.
        await Promise.all(
            folders.map(async folder => {
                if (!this.hasFlp(folder.id)) {
                    const currentFolderFlp =
                        await this.folderLevelPermissions.getFolderLevelPermission(
                            folder.type,
                            folder.id
                        );
                    if (currentFolderFlp) {
                        this.setFlp(currentFolderFlp.id, currentFolderFlp);
                    }
                }
            })
        );

        // Filter folders based on permissions.
        const foldersWithPermissions = await Promise.all(
            folders.map(async folder => {
                const permissions = this.getFlp(folder.id)?.permissions || [];
                const folderWithFlp = { ...folder, permissions };
                const canAccessFolder = await this.folderLevelPermissions.canReadFolder(
                    folderWithFlp
                );
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

    private setFlp(id: string, flp: IFolderLevelPermission) {
        this.flpCatalog.set(id, flp);
    }
}
