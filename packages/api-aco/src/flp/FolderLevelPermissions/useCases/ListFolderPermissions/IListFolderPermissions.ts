import type { FolderLevelPermission, ListFlpsParams } from "~/types";

export interface IListFolderPermissions {
    execute: (params: ListFlpsParams) => Promise<FolderLevelPermission[]>;
}
