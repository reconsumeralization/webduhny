import { Folder } from "~/folder/folder.types";

export interface CanAccessFolderContentParams {
    folder: Folder;
    rwd?: "r" | "w" | "d";
}

export interface ICanAccessFolderContent {
    execute: (params: CanAccessFolderContentParams) => Promise<boolean>;
}
