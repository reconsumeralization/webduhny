import { CmsContext, HeadlessCms } from "@webiny/api-headless-cms/types";
import { Security } from "@webiny/api-security/types";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";

import { createFilterOperations } from "~/filter/filter.so";
import { createFolderOperations } from "~/folder/folder.so";
import { createSearchRecordOperations } from "~/record/record.so";
import { createAcoModels } from "~/createAcoModels";

import { AcoStorageOperations } from "~/types";
import { createFlpOperations } from "~/flp";

export interface CreateAcoStorageOperationsParams {
    cms: HeadlessCms;
    security: Security;
    getCmsContext: () => CmsContext;
    documentClient: DynamoDBDocument;
}

export const createAcoStorageOperations = async (
    params: CreateAcoStorageOperationsParams
): Promise<AcoStorageOperations> => {
    const context = params.getCmsContext();

    await createAcoModels(context);

    return {
        folder: createFolderOperations(params),
        search: createSearchRecordOperations(params),
        filter: createFilterOperations(params),
        flp: createFlpOperations(params)
    };
};
