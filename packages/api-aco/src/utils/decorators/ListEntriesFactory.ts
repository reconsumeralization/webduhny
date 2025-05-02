import { FolderLevelPermissions } from "~/flp";
import {
    CmsEntry,
    CmsEntryListParams,
    CmsEntryMeta,
    CmsEntryValues,
    type CmsModel
} from "@webiny/api-headless-cms/types";
import { createFolderType } from "~/utils/decorators/createFolderType";
import { hasRootFolderId } from "~/utils/decorators/hasRootFolderId";
import { extractFolderIds } from "~/utils/decorators/extractFolderIds";
import { ROOT_FOLDER } from "~/constants";

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

    constructor(folderLevelPermissions: FolderLevelPermissions) {
        this.folderLevelPermissions = folderLevelPermissions;
    }

    public async execute({
        decoratee,
        model,
        initialParams = {}
    }: ListEntriesFactoryCallbackParams): Promise<[CmsEntry<CmsEntryValues>[], CmsEntryMeta]> {
        const limit = initialParams?.limit || 50;
        const where = initialParams?.where;
        const params = { ...initialParams, limit };
        const folderType = createFolderType(model);
        const hasRootFolder = hasRootFolderId({ model, where });

        if (hasRootFolder) {
            return await decoratee(model, params);
        }

        const folderIds = extractFolderIds({ where });
        const flps = await (folderIds.length === 0
            ? this.folderLevelPermissions.listFolderLevelPermissions({
                  where: { type: folderType, path_startsWith: ROOT_FOLDER }
              })
            : Promise.all(
                  folderIds.map(folderId =>
                      this.folderLevelPermissions.getFolderLevelPermission(folderId)
                  )
              ).then(results => results.flat()));

        if (flps.length === 0) {
            return await decoratee(model, params);
        }

        const resultEntries: CmsEntry<CmsEntryValues>[] = [];
        let totalCount = 0;
        let hasMoreItems = true;
        let cursor: string | null = null;
        let fetchedAll = false;

        let afterCursor = params.after;

        while (!fetchedAll) {
            const queryParams: CmsEntryListParams = { ...params, after: afterCursor };
            const [entries, currentMeta] = await decoratee(model, queryParams);

            if (totalCount === 0) {
                totalCount = currentMeta.totalCount;
            }

            for (const entry of entries) {
                const folderId = entry.values?.location?.folderId || entry.location?.folderId;

                const currentFlp = flps.find(flp => flp.id === folderId);

                if (currentFlp && (await this.folderLevelPermissions.canReadFolder(currentFlp))) {
                    resultEntries.push(entry);
                } else {
                    totalCount--;
                }
            }

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
}
