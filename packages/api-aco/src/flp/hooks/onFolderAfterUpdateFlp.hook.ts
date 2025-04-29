import WebinyError from "@webiny/error";
import { AcoContext, type IUpdateFlpTaskInput } from "~/types";
import { UPDATE_FLP_TASK_ID } from "../tasks";

export const onFolderAfterUpdateFlpHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterUpdate.subscribe(async ({ folder, original }) => {
        try {
            if (!context.tasks) {
                return;
            }

            await context.tasks.trigger<IUpdateFlpTaskInput>({
                definition: UPDATE_FLP_TASK_ID,
                input: {
                    folder,
                    original
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterUpdateFlpHook hook.",
                code: "ACO_AFTER_FOLDER_UPDATE_FLP_HOOK"
            });
        }
    });
};
