import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import { GetFlp } from "~/flp/tasks/GetFlp";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type ICreateFlpTaskInput,
    type ICreateFlpTaskParams
} from "~/types";

import { CREATE_FLP_TASK_ID } from "~/flp/tasks";

class CreateFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private flpGetter: GetFlp;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, flpGetter: GetFlp) {
        this.operations = operations;
        this.flpGetter = flpGetter;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, ICreateFlpTaskInput>({
            id: CREATE_FLP_TASK_ID,
            title: "ACO - Create FLP record",
            description:
                "Synchronizes the FLP catalog by creating the FLP record and its descendants based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: ICreateFlpTaskParams) => {
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

                    const data = await this.flpGetter.execute(input.data, context);

                    await this.operations.create({
                        data
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

export const createFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const flpGetter = new GetFlp(operations);
    const task = new CreateFlpTask(operations, flpGetter);
    return task.init();
};
