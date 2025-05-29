import { createPrivateTaskDefinition } from "@webiny/tasks";
import { UPDATE_FLP_TASK_ID } from "~/flp/tasks";
import { type AcoContext, type IUpdateFlpTaskInput, type IUpdateFlpTaskParams } from "~/types";

class UpdateFlpTask {
    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IUpdateFlpTaskInput>({
            id: UPDATE_FLP_TASK_ID,
            title: "ACO - Update FLP record",
            description:
                "Synchronizes the FLP catalog by updating the FLP record and its descendants based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IUpdateFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                const { UpdateFlp } = await import(
                    /* webpackChunkName: "UpdateFlp" */ "../useCases/UpdateFlp"
                );

                const useCase = new UpdateFlp({
                    context,
                    queued: input.queued,
                    isCloseToTimeout: isCloseToTimeout,
                    handleTimeout: (queued: string[]) => response.continue({ ...input, queued })
                });

                try {
                    if (isAborted()) {
                        return response.aborted();
                    }
                    await useCase.execute(input.folder);
                    return response.done("Task done: FLP record updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };
}

export const updateFlpTask = () => {
    const task = new UpdateFlpTask();
    return task.init();
};
