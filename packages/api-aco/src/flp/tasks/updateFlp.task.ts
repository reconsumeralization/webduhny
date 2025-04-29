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

                const useCase = new UpdateFlp(context, input.updated);

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue({ ...input, updated: useCase.getUpdated() });
                    }

                    await useCase.execute(input.folder, input.original);

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
