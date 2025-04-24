import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import { DELETE_FLP_TASK_ID } from "~/flp/tasks";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type IDeleteFlpTaskInput,
    type IDeleteFlpTaskParams
} from "~/types";

class DeleteFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IDeleteFlpTaskInput>({
            id: DELETE_FLP_TASK_ID,
            title: "ACO - Delete FLP record",
            description:
                "Synchronizes the FLP catalog by deleting the FLP record based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IDeleteFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue(input);
                    }

                    if (!input.folder) {
                        throw new WError(
                            "Missing `folder` from the task input, I can't delete the record from the FLP catalog.",
                            "ERROR_DELETE_FLP_TASK_FOLDER_NOT_PROVIDED",
                            { input }
                        );
                    }

                    const flp = await this.operations.get({
                        where: {
                            tenant: this.getTenantId(context),
                            locale: this.getLocaleCode(context),
                            type: params.input.folder.type,
                            id: params.input.folder.type
                        }
                    });

                    if (!flp) {
                        throw new WError(
                            "I can't find the FLP for the provided folder, I can't delete it from the FLP catalog.",
                            "ERROR_DELETE_FLP_TASK_FLP_NOT_FOUND",
                            { input }
                        );
                    }

                    await this.operations.delete({
                        flp
                    });

                    return response.done("Task done: FLP record deleted.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private getTenantId(context: AcoContext) {
        const tenant = context.tenancy.getCurrentTenant();
        if (!tenant) {
            throw new WError("Missing tenant in context.", "ERROR_DELETE_FLP_TASK_MISSING_TENANT");
        }
        return tenant.id;
    }

    private getLocaleCode(context: AcoContext) {
        const locale = context.i18n.getContentLocale();
        if (!locale) {
            throw new WError(
                "Missing content locale in context.",
                "ERROR_DELETE_FLP_TASK_MISSING_LOCALE"
            );
        }
        return locale.code;
    }
}

interface FlpTasksParams {
    documentClient: DynamoDBDocument;
}

export const deleteFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const task = new DeleteFlpTask(operations);
    return task.init();
};
