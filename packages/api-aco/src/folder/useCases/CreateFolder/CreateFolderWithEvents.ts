import type { ICreateFolder } from "./ICreateFolder";
import type { CreateFolderUseCasesTopics } from "./index";
import type { CreateFolderParams } from "~/folder/folder.types";

export class CreateFolderWithEvents implements ICreateFolder {
    private topics: CreateFolderUseCasesTopics;
    private readonly decoretee: ICreateFolder;

    constructor(topics: CreateFolderUseCasesTopics, decoretee: ICreateFolder) {
        this.topics = topics;
        this.decoretee = decoretee;
    }

    async execute(params: CreateFolderParams) {
        await this.topics.onFolderBeforeCreate.publish({ input: params });
        const folder = await this.decoretee.execute(params);
        await this.topics.onFolderAfterCreate.publish({ folder });
        return folder;
    }
}
