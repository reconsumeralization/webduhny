import type { ICreateFolder } from "./ICreateFolder";
import type { AcoFolderStorageOperations, CreateFolderParams } from "~/folder/folder.types";

export class CreateFolder implements ICreateFolder {
    private readonly createOperation: AcoFolderStorageOperations["createFolder"];

    constructor(createOperation: AcoFolderStorageOperations["createFolder"]) {
        this.createOperation = createOperation;
    }

    async execute(params: CreateFolderParams) {
        return await this.createOperation({ data: params });
    }
}
