import type { FolderLevelPermission } from "~/flp/flp.types";

export interface CanAccessFolderParams {
    flp: FolderLevelPermission;
    rwd?: "r" | "w" | "d";
    managePermissions?: boolean;
}

export interface ICanAccessFolder {
    execute: (params: CanAccessFolderParams) => Promise<boolean>;
}
