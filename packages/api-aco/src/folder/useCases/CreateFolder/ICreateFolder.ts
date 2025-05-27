import type { CreateFolderParams, Folder } from "~/folder/folder.types";

export interface ICreateFolder {
    execute: (params: CreateFolderParams) => Promise<Folder>;
}
