import type { FolderLevelPermission } from "~/flp/flp.types";

export interface CanAccessFolderContentParams {
    flp: FolderLevelPermission;
    rwd?: "r" | "w" | "d";
}

export interface ICanAccessFolderContent {
    execute: (params: CanAccessFolderContentParams) => Promise<boolean>;
}
