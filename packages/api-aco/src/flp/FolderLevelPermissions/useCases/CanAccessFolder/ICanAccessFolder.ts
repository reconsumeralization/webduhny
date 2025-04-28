import { Folder } from "~/folder/folder.types";

export interface CanAccessFolderParams {
    folder: Folder;
    rwd?: "r" | "w" | "d";
    managePermissions?: boolean;
}

export interface ICanAccessFolder {
    execute: (params: CanAccessFolderParams) => Promise<boolean>;
}
