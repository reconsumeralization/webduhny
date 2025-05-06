import { createTaskDefinition } from "@webiny/tasks";
import { SYNC_FLP_TASK_ID, UPDATE_FLP_TASK_ID } from "~/flp/tasks";
import {
    type AcoContext,
    type ISyncFlpTaskInput,
    type ISyncFlpTaskParams,
    type IUpdateFlpTaskInput
} from "~/types";
import WError from "@webiny/error";

class SyncFlpTask {
    public init = () => {
        return createTaskDefinition<AcoContext, ISyncFlpTaskInput>({
            id: SYNC_FLP_TASK_ID,
            title: "ACO - Sync FLP record",
            description:
                "Synchronizes the FLP catalog by updating the FLP record and its descendants based on the provided folderId.",
            disableDatabaseLogs: true,
            run: async (params: ISyncFlpTaskParams) => {
                const { response, isAborted, input, context } = params;
                try {
                    if (isAborted()) {
                        return response.aborted();
                    }

                    if (input.folderId) {
                        const folder = await context.aco.folder.get(input.folderId, true);
                        await context.tasks.trigger<IUpdateFlpTaskInput>({
                            definition: UPDATE_FLP_TASK_ID,
                            input: {
                                folder
                            }
                        });

                        return response.done(
                            `Task completed successfully: all FLP records for folderId "${input.folderId}" and its children have been queued to be synchronized.`
                        );
                    }

                    if (input.type) {
                        const [folders] = await context.aco.folder.list({
                            where: {
                                type: input.type,
                                parentId: null
                            },
                            disablePermissions: true
                        });

                        for (const folder of folders) {
                            await context.tasks.trigger<IUpdateFlpTaskInput>({
                                definition: UPDATE_FLP_TASK_ID,
                                input: {
                                    folder
                                }
                            });
                        }

                        return response.done(
                            `Task completed successfully: all FLP records for type "${input.type}" have been queued to be synchronized.`
                        );
                    }

                    throw new WError(
                        "Invalid input: either 'folderId' or 'type' must be provided."
                    );
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };
}

export const syncFlpTask = () => {
    const task = new SyncFlpTask();
    return task.init();
};
