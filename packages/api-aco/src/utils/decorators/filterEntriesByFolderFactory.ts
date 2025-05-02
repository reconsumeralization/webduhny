import { CmsEntry } from "@webiny/api-headless-cms/types";
import { ROOT_FOLDER } from "~/constants";
import { FolderLevelPermissions } from "~/flp";

export const filterEntriesByFolderFactory = (permissions: FolderLevelPermissions) => {
    return async (entries: CmsEntry[]) => {
        const results = await Promise.all(
            entries.map(async entry => {
                const folderId = entry.location?.folderId;
                if (!folderId || folderId === ROOT_FOLDER) {
                    return entry;
                }

                const flp = await permissions.getFolderLevelPermission(folderId);
                const result = await permissions.canAccessFolderContent({
                    flp,
                    rwd: "r"
                });
                return result ? entry : null;
            })
        );

        return results.filter((entry): entry is CmsEntry => !!entry);
    };
};
