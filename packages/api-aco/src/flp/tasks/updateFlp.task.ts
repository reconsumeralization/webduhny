import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import { GetFlp } from "~/flp/tasks/GetFlp";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type FolderLevelPermission,
    type IUpdateFlpTaskInput,
    type IUpdateFlpTaskParams
} from "~/types";

import { UPDATE_FLP_TASK_ID } from "~/flp/tasks";

class UpdateFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private flpGetter: GetFlp;
    private updated: Set<string>;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, flpGetter: GetFlp) {
        this.operations = operations;
        this.flpGetter = flpGetter;
        this.updated = new Set();
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IUpdateFlpTaskInput>({
            id: UPDATE_FLP_TASK_ID,
            title: "ACO - Update FLP record",
            description:
                "Keeps the FLP catalog in sync updating the FLP record and all it's children, based on the provided Folder.",
            disableDatabaseLogs: true,
            run: async (params: IUpdateFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    const { data, original, updated } = input;

                    if (updated) {
                        this.updated = updated;
                    }

                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue({ ...input, updated: this.updated });
                    }

                    if (!data || !original) {
                        throw new WError(
                            "Missing `data` or `original`, I can't update the FLP record..",
                            "ERROR_UPDATE_FLP_TASK",
                            { data, original }
                        );
                    }

                    const flp = await this.flpGetter.execute(data, context);
                    const originalFlp = await this.flpGetter.execute(original, context);

                    await this.operations.update({
                        data: flp,
                        original: originalFlp
                    });

                    const children = await this.getDirectChildren(originalFlp);

                    for (const child of children) {
                        await this.propagateUpdate(child);
                    }

                    return response.done("Task done: FLP catalog updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private async propagateUpdate(flp: FolderLevelPermission): Promise<void> {
        if (this.updated.has(flp.id)) {
            return;
        }

        this.updated.add(flp.id);
        await this.updateFlp(flp);

        const children = await this.getDirectChildren(flp);

        for (const child of children) {
            await this.propagateUpdate(child);
        }
    }

    private async updateFlp(flp: FolderLevelPermission): Promise<void> {
        const parent = await this.operations.get({
            where: {
                tenant: flp.tenant,
                locale: flp.locale,
                type: flp.type,
                id: flp.parentId
            }
        });

        if (!parent) {
            throw new WError(
                `Parent FLP record not found for node ${flp.id} with parentId ${flp.parentId}.`,
                "ERROR_FLP_PARENT_NOT_FOUND"
            );
        }

        await this.operations.update({
            data: {
                ...flp,
                path: `${parent.path}/${flp.slug}`
            }
        });
    }

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
