import type { IListFolders } from "./IListFolders";
import type { AcoFolderStorageOperations, Folder, ListFoldersParams } from "~/folder/folder.types";
import { ListMeta } from "~/types";

export class ListFolders implements IListFolders {
    private readonly listOperation: AcoFolderStorageOperations["listFolders"];

    constructor(listOperation: AcoFolderStorageOperations["listFolders"]) {
        this.listOperation = listOperation;
    }

    async execute(params: ListFoldersParams): Promise<[Folder[], ListMeta]> {
        return await this.listOperation(params);
    }
}
