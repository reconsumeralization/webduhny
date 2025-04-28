import type { FolderPermission } from "~/flp/flp.types";

export interface IGetDefaultPermissions {
    execute: (permissions: FolderPermission[]) => Promise<FolderPermission[]>;
}
