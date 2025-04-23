import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type IDeleteFlpTaskInput,
    type IDeleteFlpTaskParams
} from "~/types";
import WError from "@webiny/error";

import { DELETE_FLP_TASK_ID } from "~/flp/tasks";
import { GetFlp } from "~/flp/tasks/GetFlp";

class DeleteFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private flpGetter: GetFlp;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, flpGetter: GetFlp) {
        this.operations = operations;
        this.flpGetter = flpGetter;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IDeleteFlpTaskInput>({
            id: DELETE_FLP_TASK_ID,
            title: "ACO - Delete FLP record",
            description:
                "Synchronizes the FLP catalog by deleting the FLP record and its descendants based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IDeleteFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue(input);
                    }

                    if (!input.data) {
                        throw new WError(
                            "Missing `data`, I can't create a new record into the FLP catalog.",
                            "ERROR_CREATE_FLP_TASK"
                        );
                    }

                    const flp = await this.flpGetter.getFromFolder(input.data, context);

                    await this.operations.delete({
                        flp
                    });

                    return response.done("Task done: FLP catalog updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };
}

interface FlpTasksParams {
    documentClient: DynamoDBDocument;
}

export const deleteFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const flpGetter = new GetFlp(operations);
    const task = new DeleteFlpTask(operations, flpGetter);
    return task.init();
};
