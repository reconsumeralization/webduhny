import type { HcmsTasksContext } from "~/types";
import { fullyDeleteModel } from "~/tasks/deleteModel/graphql/fullyDeleteModel";
import { cancelDeleteModel } from "~/tasks/deleteModel/graphql/cancelDeleteModel";
import { getDeleteModelProgress } from "~/tasks/deleteModel/graphql/getDeleteModelProgress";
import { createStoreNamespace } from "~/tasks/deleteModel/helpers/store";
import type { IStoreValue } from "~/tasks/deleteModel/types";
import type { GenericRecord } from "@webiny/api/types";
import type { ListValuesResult } from "@webiny/db";
import { CmsModel } from "@webiny/api-headless-cms/types";

export interface ICreateDeleteModelCrudParams {
    context: HcmsTasksContext;
}

export const attachDeleteModelCrud = ({ context }: ICreateDeleteModelCrudParams) => {
    const getLocale = (): string => {
        return context.cms.getLocale().code;
    };
    const getTenant = (): string => {
        return context.tenancy.getCurrentTenant().id;
    };

    let modelIsBeingDeletedPromise:
        | Promise<ListValuesResult<GenericRecord<string, IStoreValue>>>
        | undefined = undefined;

    const clearListDeletingModelsPromise = () => {
        modelIsBeingDeletedPromise = undefined;
    };

    const getListDeletingModelsPromise = (params: Pick<CmsModel, "tenant" | "locale">) => {
        if (!modelIsBeingDeletedPromise) {
            modelIsBeingDeletedPromise = context.db.store.listValues<
                GenericRecord<string, IStoreValue>
            >({
                beginsWith: createStoreNamespace(params)
            });
        }
        return modelIsBeingDeletedPromise;
    };

    context.cms.listModelsBeingDeleted = async (): Promise<IStoreValue[]> => {
        const result = await getListDeletingModelsPromise({
            locale: getLocale(),
            tenant: getTenant()
        });
        if (result.error) {
            clearListDeletingModelsPromise();
            throw result.error;
        } else if (!result.data) {
            clearListDeletingModelsPromise();
            return [];
        }
        return Object.values(result.data);
    };

    context.cms.isModelBeingDeleted = async modelId => {
        const items = await context.cms.listModelsBeingDeleted();
        return items.some(item => item.modelId === modelId);
    };
    context.cms.fullyDeleteModel = async modelId => {
        return fullyDeleteModel({
            context,
            modelId
        });
    };
    context.cms.cancelFullyDeleteModel = async modelId => {
        return cancelDeleteModel({
            context,
            modelId
        });
    };
    context.cms.getDeleteModelProgress = async modelId => {
        return getDeleteModelProgress({
            context,
            modelId
        });
    };
};
