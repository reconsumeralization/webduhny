import type { FolderPermission } from "~/flp/flp.types";
import { FolderLevelPermissions } from "~/flp";
import type { IGetFolderHierarchy } from "./IGetFolderHierarchy";
import type { Folder, GetFolderHierarchyParams } from "~/folder/folder.types";

export class GetFolderHierarchyWithFolderLevelPermissions implements IGetFolderHierarchy {
    private flpCatalog: Map<string, FolderPermission[]> = new Map();
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IGetFolderHierarchy;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IGetFolderHierarchy) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: GetFolderHierarchyParams) {
        const { siblings, parents } = await this.decoretee.execute(params);
        const folders = [...parents, ...siblings];

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

        return {
            parents: await this.filterAccessibleFolders(parents),
            siblings: await this.filterAccessibleFolders(siblings)
        };
    }

    private async filterAccessibleFolders(folders: Folder[]) {
        const results = await Promise.all(
            folders.map(async folder => {
                const permissions = this.getFlp(folder.id);
                if (!permissions) {
                    return folder;
                }

                const canAccess = await this.folderLevelPermissions.canAccessFolder({
                    permissions,
                    rwd: "r"
                });

                return canAccess ? { ...folder, permissions } : null;
            })
        );
        return results.filter((folder): folder is Folder => folder !== null);
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
