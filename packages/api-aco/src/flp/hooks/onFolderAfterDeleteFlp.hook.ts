import WebinyError from "@webiny/error";
import { AcoContext, type IDeleteFlpTaskInput } from "~/types";
import { DELETE_FLP_TASK_ID } from "../tasks";
import { DeleteFlp } from "~/flp/useCases";

export const onFolderAfterDeleteFlpHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterDelete.subscribe(async ({ folder }) => {
        try {
            if (!context.tasks) {
                const useCase = new DeleteFlp(context);
                await useCase.execute(folder);
                return;
            }

            await context.tasks.trigger<IDeleteFlpTaskInput>({
                definition: DELETE_FLP_TASK_ID,
                input: {
                    folder
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterDeleteFlpHook hook.",
                code: "ACO_AFTER_FOLDER_DELETE_FLP_HOOK"
            });
        }
    });
};
