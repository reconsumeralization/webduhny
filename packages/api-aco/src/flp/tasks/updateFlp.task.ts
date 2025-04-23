import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type FolderLevelPermission,
    type IUpdateFlpTaskInput,
    type IUpdateFlpTaskParams
} from "~/types";

import { UPDATE_FLP_TASK_ID } from "~/flp/tasks";
import { GetFlp } from "~/flp/tasks/GetFlp";

class UpdateFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private flpGetter: GetFlp;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, flpGetter: GetFlp) {
        this.operations = operations;
        this.flpGetter = flpGetter;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IUpdateFlpTaskInput>({
            id: UPDATE_FLP_TASK_ID,
            title: "ACO - Update FLP record",
            description:
                "Synchronizes the FLP catalog by updating the FLP record and its descendants based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IUpdateFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    const updated = new Set(input.updated ?? []);
                    const { data, original } = input;

                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue({ ...input, updated });
                    }

                    if (!data || !original) {
                        throw new WError(
                            "Missing `data` or `original`, I can't update the FLP record..",
                            "ERROR_UPDATE_FLP_TASK",
                            { data, original }
                        );
                    }

                    const flp = await this.flpGetter.getFromFolder(data, context);
                    const originalFlp = await this.flpGetter.getFromFolder(original, context);

                    await this.operations.update({
                        data: flp,
                        original: originalFlp
                    });

                    const updateRecursive = async (flp: FolderLevelPermission) => {
                        if (isCloseToTimeout()) {
                            return response.continue({ ...input, updated });
                        }

                        if (updated.has(flp.id)) {
                            return;
                        }

                        const updatedFlp = await this.flpGetter.getFromFlp(flp, context);

                        await this.operations.update({
                            data: {
                                ...updatedFlp
                            }
                        });

                        updated.add(flp.id);

                        const children = await this.getDirectChildren(flp);

                        for (const child of children) {
                            await updateRecursive(child);
                        }

                        return;
                    };

                    const children = await this.getDirectChildren(originalFlp);

                    for (const child of children) {
                        await updateRecursive(child);
                    }

                    return response.done("Task done: FLP catalog updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private async getDirectChildren(flp: FolderLevelPermission) {
        const children = await this.operations.list({
            where: {
                tenant: flp.tenant,
                locale: flp.locale,
                type: flp.type,
                path_startsWith: `${flp.path}/`
            }
        });

        return children.filter(child => child.parentId === flp.id);
    }
}

interface FlpTasksParams {
    documentClient: DynamoDBDocument;
}

export const updateFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const flpGetter = new GetFlp(operations);
    const task = new UpdateFlpTask(operations, flpGetter);
    return task.init();
};
