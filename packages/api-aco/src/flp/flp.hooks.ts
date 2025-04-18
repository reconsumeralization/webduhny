import { AcoContext } from "~/types";
import { onFolderAfterCreateHook } from "~/flp/onFolderAfterCreate.hook";
import { onFolderAfterDeleteHook } from "~/flp/onFolderAfterDelete.hook";
import { onFolderAfterUpdateHook } from "~/flp/onFolderAfterUpdate.hook";

export const createFlpHooks = (context: AcoContext) => {
    onFolderAfterCreateHook(context);
    onFolderAfterDeleteHook(context);
    onFolderAfterUpdateHook(context);
};
