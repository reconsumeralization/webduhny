import type { Folder, GetFolderParams } from "~/folder/folder.types";

export interface IGetFolder {
    execute: (params: GetFolderParams) => Promise<Folder>;
}
