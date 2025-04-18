import WebinyError from "@webiny/error";
import { AcoContext, CatalogManagerAction, type ICatalogManagerInput } from "~/types";
import { CATALOG_MANAGER_TASK_ID } from "./flp.tasks";

export const onFolderAfterCreateHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterCreate.subscribe(async ({ folder }) => {
        try {
            await context.tasks.trigger<ICatalogManagerInput>({
                definition: CATALOG_MANAGER_TASK_ID,
                name: "Trigger FLP Catalog Manager update - Create",
                input: {
                    action: CatalogManagerAction.CREATE,
                    data: folder
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterCreateHook hook.",
                code: "ACO_AFTER_FOLDER_CREATE_HOOK"
            });
        }
    });
};
