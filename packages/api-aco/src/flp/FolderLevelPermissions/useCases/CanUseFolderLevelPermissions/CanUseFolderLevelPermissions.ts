import type { ICanUseFolderLevelPermissions } from "./ICanUseFolderPermissions";
import type { AcoContext } from "~/types";

export class CanUseFolderLevelPermissions implements ICanUseFolderLevelPermissions {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute(enabled?: boolean) {
        if (enabled === false) {
            return false;
        }

        return this.context.wcp.canUseFolderLevelPermissions();
    }
}
