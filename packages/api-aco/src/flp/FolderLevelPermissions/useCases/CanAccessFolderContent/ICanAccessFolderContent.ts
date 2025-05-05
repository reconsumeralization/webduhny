import type { FolderPermission } from "~/flp/flp.types";

export interface CanAccessFolderContentParams {
    permissions?: FolderPermission[];
    rwd?: "r" | "w" | "d";
}

export interface ICanAccessFolderContent {
    execute: (params: CanAccessFolderContentParams) => Promise<boolean>;
}
