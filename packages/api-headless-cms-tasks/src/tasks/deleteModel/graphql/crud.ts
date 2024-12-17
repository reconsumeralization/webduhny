import type { HcmsTasksContext } from "~/types";
import { fullyDeleteModel } from "~/tasks/deleteModel/graphql/fullyDeleteModel";
import { abortDeleteModel } from "~/tasks/deleteModel/graphql/abortDeleteModel";
import { getDeleteModelProgress } from "~/tasks/deleteModel/graphql/getDeleteModelProgress";
import { STORE_NAMESPACE } from "~/tasks/deleteModel/helpers/store";
import type { IStoreValue } from "~/tasks/deleteModel/types";
import type { GenericRecord } from "@webiny/api/types";
import type { ListValuesResult } from "@webiny/db";

export interface ICreateDeleteModelCrudParams {
    context: HcmsTasksContext;
}

export const attachDeleteModelCrud = ({ context }: ICreateDeleteModelCrudParams) => {
    let modelIsBeingDeletedPromise:
        | Promise<ListValuesResult<GenericRecord<string, IStoreValue>>>
        | undefined = undefined;

    const clearListDeletingModelsPromise = () => {
        modelIsBeingDeletedPromise = undefined;
    };

    const getListDeletingModelsPromise = () => {
        if (!modelIsBeingDeletedPromise) {
            modelIsBeingDeletedPromise = context.db.store.listValues<
                GenericRecord<string, IStoreValue>
            >({
                beginsWith: STORE_NAMESPACE
            });
        }
        return modelIsBeingDeletedPromise;
    };

    context.cms.listGettingDeletedModels = async (): Promise<string[]> => {
        const result = await getListDeletingModelsPromise();
        if (result.error) {
            clearListDeletingModelsPromise();
            throw result.error;
        } else if (!result.data) {
            clearListDeletingModelsPromise();
            return [];
        }
        return Object.keys(result.data);
    };

    context.cms.isModelBeingDeleted = async modelId => {
        const models = await context.cms.listGettingDeletedModels();
        return models.some(model => model === modelId);
    };
    context.cms.fullyDeleteModel = async modelId => {
        return fullyDeleteModel({
            context,
            modelId
        });
    };
    context.cms.abortDeleteModel = async modelId => {
        return abortDeleteModel({
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
