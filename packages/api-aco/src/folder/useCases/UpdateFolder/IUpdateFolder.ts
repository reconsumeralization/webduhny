import type { Folder, UpdateFolderParams } from "~/folder/folder.types";

export interface IUpdateFolder {
    execute: (id: string, data: UpdateFolderParams) => Promise<Folder>;
}
