import { createStoreNamespace } from "../helpers/store";
import type { GenericRecord } from "@webiny/api/types";
import type { IStoreValue } from "../types";
import type { ICache, ICacheKey } from "@webiny/api-headless-cms/utils/caching/types";
import type { ListValuesResult } from "@webiny/db";
import { HcmsTasksContext } from "~/types";

export type ListStoreKeysResult = Promise<ListValuesResult<GenericRecord<string, IStoreValue>>>;

export interface IListModelsBeingDeleted {
    getLocale: () => string;
    getTenant: () => string;
    createCacheKey: () => ICacheKey;
    cache: ICache<ListStoreKeysResult>;
    context: HcmsTasksContext;
}

export const createListModelsBeingDeleted = (params: IListModelsBeingDeleted) => {
    return async () => {
        const { getLocale, getTenant, createCacheKey, cache, context } = params;
        const locale = getLocale();
        const tenant = getTenant();
        const cacheKey = createCacheKey();

        console.log({
            listingModelsBeingDeleted: true,
            contextId: context.__id,
            usingCacheId: cache.id,
            keys: cacheKey.keys
        });

        const result = await cache.getOrSet(cacheKey, async () => {
            console.log({
                usingCacheInGetOrSet: cache.id
            });
            const beginsWith = createStoreNamespace({
                tenant,
                locale
            });
            return await context.db.store.listValues<GenericRecord<string, IStoreValue>>({
                beginsWith
            });
        });

        console.log({
            id: cache.id,
            keys: cacheKey.keys,
            result
        });

        if (result.error) {
            throw result.error;
        } else if (!result.data) {
            return [];
        }
        return Object.values(result.data);
    };
};
