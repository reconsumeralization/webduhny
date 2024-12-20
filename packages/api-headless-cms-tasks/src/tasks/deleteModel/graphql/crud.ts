import { HcmsTasksContext, HeadlessCmsFullyDeleteModel } from "~/types";
import { fullyDeleteModel as fullyDeleteModelMethod } from "~/tasks/deleteModel/graphql/fullyDeleteModel";
import { cancelDeleteModel } from "~/tasks/deleteModel/graphql/cancelDeleteModel";
import { getDeleteModelProgress as getDeleteModelProgressMethod } from "~/tasks/deleteModel/graphql/getDeleteModelProgress";
import {
    createCacheKey as createCacheKeyValue,
    createMemoryCache
} from "@webiny/api-headless-cms/utils";
import { mdbid } from "@webiny/utils";
import { ListStoreKeysResult } from "~/tasks/deleteModel/graphql/listModelsBeingDeleted";
import { createStoreNamespace } from "~/tasks/deleteModel/helpers/store";
import type { GenericRecord } from "@webiny/api/types";
import type { IStoreValue } from "~/tasks/deleteModel/types";

export interface ICreateDeleteModelCrudParams {
    context: HcmsTasksContext;
}

export const createDeleteModelCrud = ({
    context
}: ICreateDeleteModelCrudParams): HeadlessCmsFullyDeleteModel => {
    const getLocale = (): string => {
        return context.cms.getLocale().code;
    };
    const getTenant = (): string => {
        return context.tenancy.getCurrentTenant().id;
    };

    const createCacheKey = () => {
        return createCacheKeyValue({
            tenant: getTenant(),
            locale: getLocale(),
            type: "deleteModel"
        });
    };
    const cacheId = mdbid();
    const cache = createMemoryCache<ListStoreKeysResult>({
        id: cacheId
    });

    if (!context.__id) {
        const id = mdbid();
        console.log(`no id, assigning ${id}`);
        context.__id = id;
    } else {
        console.log(`id exists, using ${context.__id}`);
    }

    console.log({
        createdCacheId: cache.id
    });

    const listModelsBeingDeleted = async () => {
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

    const isModelBeingDeleted = async (modelId: string) => {
        const items = await listModelsBeingDeleted();
        return items.some(item => item.modelId === modelId);
    };
    const fullyDeleteModel = async function (modelId: string) {
        const result = await fullyDeleteModelMethod({
            context,
            modelId
        });
        cache.clear();
        return result;
    };

    const cancelFullyDeleteModel = async function (modelId: string) {
        const result = await cancelDeleteModel({
            context,
            modelId
        });
        cache.clear();
        return result;
    };

    const getDeleteModelProgress = async function (modelId: string) {
        return await getDeleteModelProgressMethod({
            context,
            modelId
        });
    };

    return {
        cache,
        listModelsBeingDeleted,
        isModelBeingDeleted,
        fullyDeleteModel,
        cancelFullyDeleteModel,
        getDeleteModelProgress
    };
};
