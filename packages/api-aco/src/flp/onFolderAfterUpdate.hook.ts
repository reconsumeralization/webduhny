import WebinyError from "@webiny/error";
import { AcoContext, CatalogManagerAction, type ICatalogManagerInput } from "~/types";
import { CATALOG_MANAGER_TASK_ID } from "./flp.tasks";

export const onFolderAfterUpdateHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterUpdate.subscribe(async ({ folder, original }) => {
        try {
            await context.tasks.trigger<ICatalogManagerInput>({
                definition: CATALOG_MANAGER_TASK_ID,
                name: "Trigger FLP Catalog Manager update - Update",
                input: {
                    action: CatalogManagerAction.UPDATE,
                    data: folder,
                    original
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterUpdateHook hook.",
                code: "ACO_AFTER_FOLDER_UPDATE_HOOK"
            });
        }
    });
};
