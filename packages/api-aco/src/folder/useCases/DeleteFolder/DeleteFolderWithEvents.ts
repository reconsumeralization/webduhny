import type { DeleteFolderUseCasesTopics } from "./index";
import type { AcoFolderStorageOperations, DeleteFolderParams } from "~/folder/folder.types";
import type { IDeleteFolder } from "~/folder/useCases/DeleteFolder/IDeleteFolder";

export class DeleteFolderWithEvents implements IDeleteFolder {
    private topics: DeleteFolderUseCasesTopics;
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];
    private readonly decoretee: IDeleteFolder;

    constructor(
        topics: DeleteFolderUseCasesTopics,
        getOperation: AcoFolderStorageOperations["getFolder"],
        decoretee: IDeleteFolder
    ) {
        this.topics = topics;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteFolderParams) {
        const folder = await this.getOperation({ id: params.id });
        await this.topics.onFolderBeforeDelete.publish({ folder });
        await this.decoretee.execute(params);
        await this.topics.onFolderAfterDelete.publish({ folder });
        return true;
    }
}
