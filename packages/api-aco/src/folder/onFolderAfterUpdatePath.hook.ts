import WebinyError from "@webiny/error";
import { AcoContext } from "~/types";

export const onFolderAfterUpdatePathHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterUpdate.subscribe(async ({ folder }) => {
        try {
            const { id, type } = folder;

            const [childFolders] = await context.aco.folder.listAll({
                where: {
                    type,
                    parentId: id
                }
            });

            if (childFolders.length === 0) {
                return;
            }

            for (const childFolder of childFolders) {
                await context.aco.folder.update(childFolder.id, {
                    parentId: folder.id
                });
            }
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterUpdatePathHook hook.",
                code: "ACO_AFTER_FOLDER_UPDATE_PATH_HOOK"
            });
        }
    });
};
