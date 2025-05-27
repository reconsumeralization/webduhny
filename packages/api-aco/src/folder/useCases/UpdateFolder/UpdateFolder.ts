import type { IUpdateFolder } from "./IUpdateFolder";
import type { AcoFolderStorageOperations, Folder, UpdateFolderParams } from "~/folder/folder.types";

export class UpdateFolder implements IUpdateFolder {
    private readonly updateOperation: AcoFolderStorageOperations["updateFolder"];

    constructor(updateOperation: AcoFolderStorageOperations["updateFolder"]) {
        this.updateOperation = updateOperation;
    }

    async execute(id: string, params: UpdateFolderParams): Promise<Folder> {
        return await this.updateOperation({ id, data: params });
    }
}
