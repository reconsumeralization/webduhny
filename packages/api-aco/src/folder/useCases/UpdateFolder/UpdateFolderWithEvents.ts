import type { UpdateFolderUseCasesTopics } from "./index";
import type { AcoFolderStorageOperations, Folder, UpdateFolderParams } from "~/folder/folder.types";
import type { IUpdateFolder } from "~/folder/useCases/UpdateFolder/IUpdateFolder";

export class UpdateFolderWithEvents implements IUpdateFolder {
    private topics: UpdateFolderUseCasesTopics;
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];
    private readonly decoretee: IUpdateFolder;

    constructor(
        topics: UpdateFolderUseCasesTopics,
        getOperation: AcoFolderStorageOperations["getFolder"],
        decoretee: IUpdateFolder
    ) {
        this.topics = topics;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(id: string, params: UpdateFolderParams): Promise<Folder> {
        const original = await this.getOperation({ id });
        await this.topics.onFolderBeforeUpdate.publish({ original, input: { id, data: params } });
        const folder = await this.decoretee.execute(id, params);
        await this.topics.onFolderAfterUpdate.publish({
            original,
            input: { id, data: params },
            folder
        });
        return folder;
    }
}
