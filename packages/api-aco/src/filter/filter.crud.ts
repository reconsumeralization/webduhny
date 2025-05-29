import { createTopic } from "@webiny/pubsub";

import { CreateAcoParams } from "~/types";
import {
    AcoFilterCrud,
    OnFilterAfterCreateTopicParams,
    OnFilterAfterDeleteTopicParams,
    OnFilterAfterUpdateTopicParams,
    OnFilterBeforeCreateTopicParams,
    OnFilterBeforeDeleteTopicParams,
    OnFilterBeforeUpdateTopicParams
} from "./filter.types";

export const createFilterCrudMethods = ({ storageOperations }: CreateAcoParams): AcoFilterCrud => {
    // create
    const onFilterBeforeCreate = createTopic<OnFilterBeforeCreateTopicParams>(
        "aco.onFilterBeforeCreate"
    );
    const onFilterAfterCreate =
        createTopic<OnFilterAfterCreateTopicParams>("aco.onFilterAfterCreate");
    // update
    const onFilterBeforeUpdate = createTopic<OnFilterBeforeUpdateTopicParams>(
        "aco.onFilterBeforeUpdate"
    );
    const onFilterAfterUpdate =
        createTopic<OnFilterAfterUpdateTopicParams>("aco.onFilterAfterUpdate");
    // delete
    const onFilterBeforeDelete = createTopic<OnFilterBeforeDeleteTopicParams>(
        "aco.onFilterBeforeDelete"
    );
    const onFilterAfterDelete =
        createTopic<OnFilterAfterDeleteTopicParams>("aco.onFilterAfterDelete");

    return {
        /**
         * Lifecycle events
         */
        onFilterBeforeCreate,
        onFilterAfterCreate,
        onFilterBeforeUpdate,
        onFilterAfterUpdate,
        onFilterBeforeDelete,
        onFilterAfterDelete,
        async get(id) {
            return storageOperations.filter.getFilter({ id });
        },
        async list(params) {
            return storageOperations.filter.listFilters(params);
        },
        async create(data) {
            await onFilterBeforeCreate.publish({ input: data });
            const filter = await storageOperations.filter.createFilter({ data });
            await onFilterAfterCreate.publish({ filter });
            return filter;
        },
        async update(id, data) {
            const original = await storageOperations.filter.getFilter({ id });
            await onFilterBeforeUpdate.publish({ original, input: { id, data } });
            const filter = await storageOperations.filter.updateFilter({ id, data });
            await onFilterAfterUpdate.publish({ original, input: { id, data }, filter });
            return filter;
        },
        async delete(id: string) {
            const filter = await storageOperations.filter.getFilter({ id });
            await onFilterBeforeDelete.publish({ filter });
            await storageOperations.filter.deleteFilter({ id });
            await onFilterAfterDelete.publish({ filter });
            return true;
        }
    };
};
