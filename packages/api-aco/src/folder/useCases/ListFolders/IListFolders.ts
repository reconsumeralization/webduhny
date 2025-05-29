import type { Folder, ListFoldersParams } from "~/folder/folder.types";
import { ListMeta } from "~/types";

export interface IListFolders {
    execute: (params: ListFoldersParams) => Promise<[Folder[], ListMeta]>;
}
