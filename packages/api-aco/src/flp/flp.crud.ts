import { I18NLocale } from "@webiny/api-i18n/types";
import { Tenant } from "@webiny/api-tenancy/types";
import { createTopic } from "@webiny/pubsub";
import {
    type AcoFolderLevelPermissionsCrud,
    type AcoStorageOperations,
    type CreateFlpParams,
    type OnFlpAfterCreateTopicParams,
    type OnFlpAfterDeleteTopicParams,
    type OnFlpAfterUpdateTopicParams,
    type OnFlpBeforeCreateTopicParams,
    type OnFlpBeforeDeleteTopicParams,
    type OnFlpBeforeUpdateTopicParams,
    type OnFlpBatchBeforeUpdateTopicParams,
    type OnFlpBatchAfterUpdateTopicParams,
    type UpdateFlpParams
} from "~/types";
import { WebinyError } from "@webiny/error";

export interface CreateFlpCrudMethodsParams {
    getLocale: () => I18NLocale;
    getTenant: () => Tenant;
    storageOperations: AcoStorageOperations;
}

export const createFlpCrudMethods = ({
    storageOperations,
    getTenant,
    getLocale
}: CreateFlpCrudMethodsParams): AcoFolderLevelPermissionsCrud => {
    // create
    const onFlpBeforeCreate = createTopic<OnFlpBeforeCreateTopicParams>("aco.onFlpBeforeCreate");
    const onFlpAfterCreate = createTopic<OnFlpAfterCreateTopicParams>("aco.onFlpAfterCreate");
    // update
    const onFlpBeforeUpdate = createTopic<OnFlpBeforeUpdateTopicParams>("aco.onFlpBeforeUpdate");
    const onFlpAfterUpdate = createTopic<OnFlpAfterUpdateTopicParams>("aco.onFlpAfterUpdate");
    // delete
    const onFlpBeforeDelete = createTopic<OnFlpBeforeDeleteTopicParams>("aco.onFlpBeforeDelete");
    const onFlpAfterDelete = createTopic<OnFlpAfterDeleteTopicParams>("aco.onFlpAfterDelete");
    // batch update
    const onFlpBatchBeforeUpdate = createTopic<OnFlpBatchBeforeUpdateTopicParams>(
        "aco.onFlpBatchBeforeUpdate"
    );
    const onFlpBatchAfterUpdate = createTopic<OnFlpBatchAfterUpdateTopicParams>(
        "aco.onFlpBatchAfterUpdate"
    );

    return {
        onFlpBeforeCreate,
        onFlpAfterCreate,
        onFlpBeforeUpdate,
        onFlpAfterUpdate,
        onFlpBeforeDelete,
        onFlpAfterDelete,
        onFlpBatchBeforeUpdate,
        onFlpBatchAfterUpdate,
        async create(params: CreateFlpParams) {
            await onFlpBeforeCreate.publish({ input: params });
            const flp = await storageOperations.flp.create({
                data: { ...params, tenant: getTenant().id, locale: getLocale().code }
            });
            await onFlpAfterCreate.publish({ flp });
            return flp;
        },
        async update(id: string, data: UpdateFlpParams) {
            const original = await this.get(id);
            if (!original) {
                throw new WebinyError(
                    `Folder level permission with id "${id}" not found.`,
                    "GET_ITEM_UPDATE_FLP_ERROR",
                    {
                        id,
                        data
                    }
                );
            }
            await onFlpBeforeUpdate.publish({ original, input: { id, data } });
            const flp = await storageOperations.flp.update({
                original,
                data: {
                    ...data,
                    tenant: getTenant().id,
                    locale: getLocale().code
                }
            });
            await onFlpAfterUpdate.publish({ original, input: { id, data }, flp });
            return flp;
        },
        async batchUpdate(items: Array<{ id: string; data: UpdateFlpParams }>) {
            const batchItems = (
                await Promise.all(
                    items.map(async ({ id, data }) => {
                        const original = await this.get(id);
                        if (!original) {
                            return null;
                        }
                        return {
                            original,
                            data: {
                                ...data,
                                tenant: getTenant().id,
                                locale: getLocale().code
                            }
                        };
                    })
                )
            ).filter((item): item is NonNullable<typeof item> => item !== null);

            if (batchItems.length === 0) {
                return [];
            }

            await onFlpBatchBeforeUpdate.publish({
                items: batchItems.map(({ original, data }) => ({
                    original,
                    input: data
                }))
            });

            const updatedItems = await storageOperations.flp.batchUpdate({
                items: batchItems
            });

            await onFlpBatchAfterUpdate.publish({
                items: batchItems.map(({ original }, index) => ({
                    original,
                    flp: updatedItems[index],
                    input: items[index].data
                }))
            });

            return updatedItems;
        },
        async delete(id: string) {
            const flp = await this.get(id);
            if (!flp) {
                throw new WebinyError(
                    `Folder level permission with id "${id}" not found.`,
                    "GET_ITEM_DELETE_FLP_ERROR",
                    {
                        id
                    }
                );
            }
            await onFlpBeforeDelete.publish({ flp });
            await storageOperations.flp.delete({
                flp: {
                    ...flp,
                    tenant: getTenant().id,
                    locale: getLocale().code
                }
            });
            await onFlpAfterDelete.publish({ flp });
            return true;
        },
        async get(id: string) {
            return await storageOperations.flp.get({
                id,
                tenant: getTenant().id,
                locale: getLocale().code
            });
        },
        async list({ where }) {
            return await storageOperations.flp.list({
                where: {
                    ...where,
                    tenant: getTenant().id,
                    locale: getLocale().code
                }
            });
        }
    };
};
