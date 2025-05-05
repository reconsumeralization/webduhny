import { FolderLevelPermissions } from "~/flp";
import {
    CmsEntry,
    CmsEntryListParams,
    CmsEntryMeta,
    CmsEntryValues,
    type CmsModel
} from "@webiny/api-headless-cms/types";
import { hasRootFolderId } from "~/utils/decorators/hasRootFolderId";
import type { FolderLevelPermission } from "~/flp/flp.types";

interface ListEntriesFactoryCallbackParams {
    decoratee: <T extends CmsEntryValues = CmsEntryValues>(
        model: CmsModel,
        params: CmsEntryListParams
    ) => Promise<[CmsEntry<T>[], CmsEntryMeta]>;
    model: CmsModel;
    initialParams?: CmsEntryListParams;
}

export class ListEntriesFactory {
    private readonly folderLevelPermissions: FolderLevelPermissions;
    private readonly flpCache: Map<string, any>;

    constructor(folderLevelPermissions: FolderLevelPermissions) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.flpCache = new Map();
    }

    public async execute({
        decoratee,
        model,
        initialParams = {}
    }: ListEntriesFactoryCallbackParams): Promise<[CmsEntry[], CmsEntryMeta]> {
        const limit = initialParams?.limit || 50;
        const where = initialParams?.where;
        const params = { ...initialParams, limit };
        const hasRootFolder = hasRootFolderId({ model, where });

        // If we're querying the root folder, skip permission checks
        if (hasRootFolder) {
            return await decoratee(model, params);
        }

        const resultEntries: CmsEntry[] = [];
        let totalCount = 0;
        let hasMoreItems = true;
        let cursor: string | null = null;
        let fetchedAll = false;
        let afterCursor = params.after;

        // Process entries in batches until we have enough results or reach the end
        while (!fetchedAll) {
            const queryParams: CmsEntryListParams = { ...params, after: afterCursor };
            const [entries, currentMeta] = await decoratee(model, queryParams);

            if (totalCount === 0) {
                totalCount = currentMeta.totalCount;
            }

            // Process each entry and check folder permissions
            for (const entry of entries) {
                const folderId = entry.values?.location?.folderId || entry.location?.folderId;

                // If entry has no folderId, it's not using ACO folders system
                // Include it in results as it's not subject to folder permissions
                if (!folderId) {
                    resultEntries.push(entry);
                    continue;
                }

                const flp = await this.getFolderLevelPermission(folderId);

                // If no FLP exists for the folder, the entry is accessible
                // This means the folder doesn't have any permission restrictions
                if (!flp) {
                    resultEntries.push(entry);
                    continue;
                }

                // Check if user has read permission for the folder
                if (
                    await this.folderLevelPermissions.canAccessFolderContent({
                        flp,
                        rwd: "r"
                    })
                ) {
                    resultEntries.push(entry);
                } else {
                    totalCount--;
                }
            }

            // Determine if we need to fetch more entries
            if (!currentMeta.hasMoreItems || resultEntries.length >= limit) {
                fetchedAll = true;
                hasMoreItems = currentMeta.hasMoreItems;
                cursor = currentMeta.cursor;
            } else {
                afterCursor = currentMeta.cursor;
            }
        }

        return [resultEntries, { totalCount, hasMoreItems, cursor } as CmsEntryMeta];
    }

    private async getFolderLevelPermission(
        folderId: string
    ): Promise<FolderLevelPermission | null> {
        try {
            if (this.flpCache.has(folderId)) {
                return this.flpCache.get(folderId);
            }

            const flp = await this.folderLevelPermissions.getFolderLevelPermission(folderId);
            this.flpCache.set(folderId, flp);
            return flp;
        } catch (error) {
            // Handle case where permission doesn't exist
            if (error.code === "GET_FLP_NOT_FOUND_ERROR") {
                return null;
            }

            throw error;
        }
    }
}
