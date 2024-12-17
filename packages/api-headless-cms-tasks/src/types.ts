import type { HcmsBulkActionsContext } from "@webiny/api-headless-cms-bulk-actions/types";
import type { AcoContext } from "@webiny/api-aco/types";
import type { HeadlessCms } from "@webiny/api-headless-cms/types";
import type { IDeleteCmsModelTask } from "~/tasks/deleteModel/types";

export interface HeadlessCmsFullyDeleteModel {
    fullyDeleteModel: (modelId: string) => Promise<IDeleteCmsModelTask>;
    abortDeleteModel: (modelId: string) => Promise<IDeleteCmsModelTask>;
    getDeleteModelProgress: (modelId: string) => Promise<IDeleteCmsModelTask>;
    isModelBeingDeleted: (modelId: string) => Promise<boolean>;
    listGettingDeletedModels: () => Promise<string[]>;
}

export interface HcmsTasksContext extends HcmsBulkActionsContext, AcoContext {
    cms: HeadlessCms & HeadlessCmsFullyDeleteModel;
}
