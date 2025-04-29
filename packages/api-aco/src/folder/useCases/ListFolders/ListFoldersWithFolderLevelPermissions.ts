import type { Folder, ListFoldersParams } from "~/folder/folder.types";
import type { IListFolders } from "./IListFolders";
import { FolderLevelPermissions } from "~/flp";
import { ROOT_FOLDER } from "~/constants";
import type { ListMeta } from "~/types";

export class ListFoldersWithFolderLevelPermissions implements IListFolders {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IListFolders;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IListFolders) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: ListFoldersParams): Promise<[Folder[], ListMeta]> {
        const [folders, meta] = await this.decoretee.execute(params);

        // Let's get the FLP records for the current folders.
        const flps = await this.folderLevelPermissions.listFolderLevelPermissions({
            where: {
                type: params.where.type,
                parentId: params.where.parentId ?? ROOT_FOLDER
            }
        });

        const flpCatalog = new Map(flps.map(flp => [flp.id, flp]));

        const foldersWithPermissions: Folder[] = [];
        for (const folder of folders) {
            const permissions = flpCatalog.get(folder.id)?.permissions || [];

            const folderWithFlp = {
                ...folder,
                permissions
            };

            // Let's check if the current user has read access level.
            const canAccessFolder = await this.folderLevelPermissions.canReadFolder(folderWithFlp);

            if (canAccessFolder) {
                foldersWithPermissions.push(folderWithFlp);
            }
        }

        return [foldersWithPermissions, meta];
    }
}
