import type { ICheckNotInheritedPermissions } from "./ICheckNotInheritedPermissions";
import type { FolderPermission } from "~/flp/flp.types";

export class CheckNotInheritedPermissions implements ICheckNotInheritedPermissions {
    execute(permissions?: FolderPermission[]) {
        return permissions?.some(p => !p.inheritedFrom);
    }
}
