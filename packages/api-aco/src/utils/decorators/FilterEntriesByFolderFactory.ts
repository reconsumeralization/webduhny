import { FolderLevelPermissions } from "~/flp";
import { CmsEntry } from "@webiny/api-headless-cms/types";
import { ROOT_FOLDER } from "~/constants";

export class FilterEntriesByFolderFactory {
    private readonly folderLevelPermissions: FolderLevelPermissions;

    constructor(folderLevelPermissions: FolderLevelPermissions) {
        this.folderLevelPermissions = folderLevelPermissions;
    }

    public async execute(entries: CmsEntry[]): Promise<CmsEntry[]> {
        const results = await Promise.all(
            entries.map(async entry => {
                const folderId = entry.location?.folderId;
                if (!folderId || folderId === ROOT_FOLDER) {
                    return entry;
                }

                const flp = await this.folderLevelPermissions.getFolderLevelPermission(folderId);
                const canAccessFolderContent =
                    await this.folderLevelPermissions.canAccessFolderContent({
                        flp,
                        rwd: "r"
                    });
                return canAccessFolderContent ? entry : null;
            })
        );

        return results.filter((entry): entry is CmsEntry => !!entry);
    }
}
