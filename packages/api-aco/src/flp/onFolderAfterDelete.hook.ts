import WebinyError from "@webiny/error";
import { AcoContext, CatalogManagerAction, type ICatalogManagerInput } from "~/types";
import { CATALOG_MANAGER_TASK_ID } from "./flp.tasks";

export const onFolderAfterDeleteHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterDelete.subscribe(async ({ folder }) => {
        try {
            await context.tasks.trigger<ICatalogManagerInput>({
                definition: CATALOG_MANAGER_TASK_ID,
                name: "Trigger FLP Catalog Manager update - Delete",
                input: {
                    action: CatalogManagerAction.DELETE,
                    data: folder
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterDeleteHook hook.",
                code: "ACO_AFTER_FOLDER_DELETE_HOOK"
            });
        }
    });
};
