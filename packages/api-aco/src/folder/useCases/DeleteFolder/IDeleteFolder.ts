import type { DeleteFolderParams } from "~/folder/folder.types";

export interface IDeleteFolder {
    execute: (params: DeleteFolderParams) => Promise<boolean>;
}
