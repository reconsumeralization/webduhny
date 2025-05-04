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
            await onFlpBeforeUpdate.publish({ original, input: { id, data } });
            const flp = await storageOperations.flp.update({ original, data });
            await onFlpAfterUpdate.publish({ original, input: { id, data }, flp });
            return flp;
        },
        async batchUpdate(items: Array<{ id: string; data: UpdateFlpParams }>) {
            // First get all original items
            const originals = await Promise.all(
                items.map(async ({ id }) => {
                    const original = await this.get(id);
                    return { id, original };
                })
            );

            // Prepare items for batch update
            const batchItems = originals.map(({ id, original }) => ({
                original,
                data: items.find(item => item.id === id)!.data
            }));

            // Publish before update event
            await onFlpBatchBeforeUpdate.publish({
                items: batchItems.map(({ original, data }) => ({
                    original,
                    input: data
                }))
            });

            // Execute batch update
            const updatedItems = await storageOperations.flp.batchUpdate({
                items: batchItems
            });

            // Publish after update event
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
            await onFlpBeforeDelete.publish({ flp });
            await storageOperations.flp.delete({ flp });
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
