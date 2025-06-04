import { onFolderAfterCreateFlpHook } from "./onFolderAfterCreateFlp.hook";
import { onFolderAfterDeleteFlpHook } from "./onFolderAfterDeleteFlp.hook";
import { onFolderAfterUpdateFlpHook } from "./onFolderAfterUpdateFlp.hook";
import { AcoContext } from "~/types";

export const createFlpHooks = (context: AcoContext) => {
    onFolderAfterCreateFlpHook(context);
    onFolderAfterDeleteFlpHook(context);
    onFolderAfterUpdateFlpHook(context);
};
