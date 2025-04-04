import { CmsContext, HeadlessCms } from "@webiny/api-headless-cms/types";
import { Security } from "@webiny/api-security/types";

import { createFilterOperations } from "~/filter/filter.so";
import { createFolderOperations } from "~/folder/folder.so";
import { createSearchRecordOperations } from "~/record/record.so";
import { createAcoModels } from "~/createAcoModels";

import { AcoStorageOperations } from "~/types";

export interface CreateAcoStorageOperationsParams {
    cms: HeadlessCms;
    security: Security;
    getCmsContext: () => CmsContext;
}

export const createAcoStorageOperations = async (
    params: CreateAcoStorageOperationsParams
): Promise<AcoStorageOperations> => {
    const context = params.getCmsContext();

    await createAcoModels(context);

    return {
        ...createFolderOperations(params),
        ...createSearchRecordOperations(params),
        ...createFilterOperations(params)
    };
};
