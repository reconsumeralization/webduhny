import { AcoContext } from "~/types";
import { ROOT_FOLDER } from "~/constants";
import { filterEntriesByFolderFactory } from "./filterEntriesByFolderFactory";
import { decorateIfModelAuthorizationEnabled } from "./decorateIfModelAuthorizationEnabled";
import { extractFolderIds } from "~/utils/decorators/extractFolderIds";
import { createFolderType } from "~/utils/decorators/createFolderType";
import type {
    CmsEntry,
    CmsEntryListParams,
    CmsEntryMeta,
    CmsEntryValues
} from "@webiny/api-headless-cms/types";
import { hasRootFolderId } from "~/utils/decorators/hasRootFolderId";

type Context = Pick<AcoContext, "aco" | "cms">;

interface EntryManagerCrudDecoratorsParams {
    context: Context;
}

export class CmsEntriesCrudDecorators {
    private readonly context: Context;

    public constructor({ context }: EntryManagerCrudDecoratorsParams) {
        this.context = context;
    }

    public decorate() {
        const context = this.context;
        const folderLevelPermissions = context.aco.folderLevelPermissions;

        const filterEntriesByFolder = filterEntriesByFolderFactory(folderLevelPermissions);

        decorateIfModelAuthorizationEnabled(context.cms, "listEntries", async (...allParams) => {
            const [decoratee, model, initialParams] = allParams;
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
                ? folderLevelPermissions.listFolderLevelPermissions({
                      where: { type: folderType, path_startsWith: ROOT_FOLDER }
                  })
                : Promise.all(
                      folderIds.map(folderId =>
                          folderLevelPermissions.getFolderLevelPermission(folderId)
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

                    if (currentFlp && (await folderLevelPermissions.canReadFolder(currentFlp))) {
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
        });

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "listLatestEntries",
            async (...allParams) => {
                const [decoratee, model, initialParams] = allParams;
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
                    ? folderLevelPermissions.listFolderLevelPermissions({
                          where: { type: folderType, path_startsWith: ROOT_FOLDER }
                      })
                    : Promise.all(
                          folderIds.map(folderId =>
                              folderLevelPermissions.getFolderLevelPermission(folderId)
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
                        const folderId =
                            entry.values?.location?.folderId || entry.location?.folderId;

                        const currentFlp = flps.find(flp => flp.id === folderId);

                        if (
                            currentFlp &&
                            (await folderLevelPermissions.canReadFolder(currentFlp))
                        ) {
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
        );

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "listPublishedEntries",
            async (...allParams) => {
                const [decoratee, model, initialParams] = allParams;
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
                    ? folderLevelPermissions.listFolderLevelPermissions({
                          where: { type: folderType, path_startsWith: ROOT_FOLDER }
                      })
                    : Promise.all(
                          folderIds.map(folderId =>
                              folderLevelPermissions.getFolderLevelPermission(folderId)
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
                        const folderId =
                            entry.values?.location?.folderId || entry.location?.folderId;

                        const currentFlp = flps.find(flp => flp.id === folderId);

                        if (
                            currentFlp &&
                            (await folderLevelPermissions.canReadFolder(currentFlp))
                        ) {
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
        );

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "listDeletedEntries",
            async (...allParams) => {
                const [decoratee, model, initialParams] = allParams;
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
                    ? folderLevelPermissions.listFolderLevelPermissions({
                          where: { type: folderType, path_startsWith: ROOT_FOLDER }
                      })
                    : Promise.all(
                          folderIds.map(folderId =>
                              folderLevelPermissions.getFolderLevelPermission(folderId)
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
                        const folderId =
                            entry.values?.location?.folderId || entry.location?.folderId;

                        const currentFlp = flps.find(flp => flp.id === folderId);

                        if (
                            currentFlp &&
                            (await folderLevelPermissions.canReadFolder(currentFlp))
                        ) {
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
        );

        decorateIfModelAuthorizationEnabled(context.cms, "getEntry", async (...allParams) => {
            const [decoratee, model, params] = allParams;
            const entry = await decoratee(model, params);

            const folderId = entry?.location?.folderId;
            if (!folderId || folderId === ROOT_FOLDER) {
                return entry;
            }

            const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
            await folderLevelPermissions.ensureCanAccessFolderContent({
                flp,
                rwd: "r"
            });

            return entry;
        });

        decorateIfModelAuthorizationEnabled(context.cms, "getEntryById", async (...allParams) => {
            const [decoratee, model, params] = allParams;
            const entry = await decoratee(model, params);

            const folderId = entry?.location?.folderId;
            if (!folderId || folderId === ROOT_FOLDER) {
                return entry;
            }
            const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
            await folderLevelPermissions.ensureCanAccessFolderContent({
                flp,
                rwd: "r"
            });
            return entry;
        });

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "getLatestEntriesByIds",
            async (...allParams) => {
                const [decoratee, model, ids] = allParams;

                const entries = await decoratee(model, ids);

                return filterEntriesByFolder(entries);
            }
        );

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "getPublishedEntriesByIds",
            async (...allParams) => {
                const [decoratee, model, ids] = allParams;

                const entries = await decoratee(model, ids);
                return filterEntriesByFolder(entries);
            }
        );

        decorateIfModelAuthorizationEnabled(context.cms, "createEntry", async (...allParams) => {
            const [decoratee, model, params, options] = allParams;
            const folderId = params.wbyAco_location?.folderId || params.location?.folderId;

            if (!folderId || folderId === ROOT_FOLDER) {
                return decoratee(model, params, options);
            }

            const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
            await folderLevelPermissions.ensureCanAccessFolderContent({
                flp,
                rwd: "w"
            });

            return decoratee(model, params, options);
        });

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "createEntryRevisionFrom",
            async (...allParams) => {
                const [decoratee, model, id, input, options] = allParams;

                const entry = await context.cms.storageOperations.entries.getRevisionById(model, {
                    id
                });

                const folderId = entry?.location?.folderId;
                if (!folderId || folderId === ROOT_FOLDER) {
                    return decoratee(model, id, input, options);
                }

                const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
                await folderLevelPermissions.ensureCanAccessFolderContent({
                    flp,
                    rwd: "w"
                });

                return decoratee(model, id, input, options);
            }
        );

        decorateIfModelAuthorizationEnabled(context.cms, "updateEntry", async (...allParams) => {
            const [decoratee, model, id, input, meta, options] = allParams;
            const entry = await context.cms.storageOperations.entries.getRevisionById(model, {
                id
            });

            const folderId = entry?.location?.folderId;
            if (!folderId || folderId === ROOT_FOLDER) {
                return decoratee(model, id, input, meta, options);
            }

            const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
            await folderLevelPermissions.ensureCanAccessFolderContent({
                flp,
                rwd: "w"
            });

            return decoratee(model, id, input, meta, options);
        });

        decorateIfModelAuthorizationEnabled(context.cms, "deleteEntry", async (...allParams) => {
            const [decoratee, model, id, options] = allParams;

            const entry = await context.cms.storageOperations.entries.getLatestRevisionByEntryId(
                model,
                {
                    id
                }
            );

            const folderId = entry?.location?.folderId;
            if (!folderId || folderId === ROOT_FOLDER) {
                return decoratee(model, id, options);
            }

            const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
            await folderLevelPermissions.ensureCanAccessFolderContent({
                flp,
                rwd: "d"
            });

            return decoratee(model, id, options);
        });

        decorateIfModelAuthorizationEnabled(
            context.cms,
            "deleteEntryRevision",
            async (...allParams) => {
                const [decoratee, model, id] = allParams;

                const entry = await context.cms.storageOperations.entries.getRevisionById(model, {
                    id
                });

                const folderId = entry?.location?.folderId;
                if (!folderId || folderId === ROOT_FOLDER) {
                    return decoratee(model, id);
                }

                const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
                await folderLevelPermissions.ensureCanAccessFolderContent({
                    flp,
                    rwd: "d"
                });

                return decoratee(model, id);
            }
        );

        decorateIfModelAuthorizationEnabled(context.cms, "moveEntry", async (...allParams) => {
            const [decoratee, model, id, targetFolderId] = allParams;

            /**
             * First we need to check if user has access to the entries existing folder.
             */
            const entry = await context.cms.storageOperations.entries.getRevisionById(model, {
                id
            });

            const folderId = entry?.location?.folderId || ROOT_FOLDER;
            /**
             * If the entry is in the same folder we are trying to move it to, just continue.
             */
            if (folderId === targetFolderId) {
                return decoratee(model, id, targetFolderId);
            } else if (folderId !== ROOT_FOLDER) {
                /**
                 * If entry current folder is not a root, check for access
                 */
                const flp = await folderLevelPermissions.getFolderLevelPermission(folderId);
                await folderLevelPermissions.ensureCanAccessFolderContent({
                    flp,
                    rwd: "w"
                });
            }
            /**
             * If target folder is not a ROOT_FOLDER, check for access.
             */
            if (targetFolderId !== ROOT_FOLDER) {
                const flp = await folderLevelPermissions.getFolderLevelPermission(targetFolderId);
                await folderLevelPermissions.ensureCanAccessFolderContent({
                    flp,
                    rwd: "w"
                });
            }

            return decoratee(model, id, targetFolderId);
        });
    }
}
