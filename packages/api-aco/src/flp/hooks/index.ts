import { AcoContext } from "~/types";
import { onFolderAfterCreateFlpHook } from "~/flp/hooks/onFolderAfterCreateFlp.hook";
import { onFolderAfterDeleteFlpHook } from "~/flp/hooks/onFolderAfterDeleteFlp.hook";
import { onFolderAfterUpdateFlpHook } from "~/flp/hooks/onFolderAfterUpdateFlp.hook";

export const createFlpHooks = (context: AcoContext) => {
    onFolderAfterCreateFlpHook(context);
    onFolderAfterDeleteFlpHook(context);
    onFolderAfterUpdateFlpHook(context);
};
