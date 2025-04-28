import type { FolderPermission } from "~/flp/flp.types";

export interface ICheckNotInheritedPermissions {
    execute: (permissions?: FolderPermission[]) => boolean | undefined;
}
