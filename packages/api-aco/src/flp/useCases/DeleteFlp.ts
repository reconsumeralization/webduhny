import { WebinyError } from "@webiny/error";
import type { AcoContext, Folder } from "~/types";

export class DeleteFlp {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    async execute(folder: Folder) {
        try {
            if (!folder) {
                throw new WebinyError(
                    "Missing `folder` from the task input, I can't delete the record from the FLP catalog.",
                    "ERROR_DELETE_FLP_USE_CASE_FOLDER_NOT_PROVIDED",
                    { folder }
                );
            }
            await this.context.aco.flp.delete(folder.id);
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while deleting FLP",
                code: "ERROR_DELETE_FLP_USE_CASE"
            });
        }
    }
}
