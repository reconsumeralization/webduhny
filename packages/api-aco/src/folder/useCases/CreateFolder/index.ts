import { Topic } from "@webiny/pubsub/types";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterCreateTopicParams,
    type OnFolderBeforeCreateTopicParams
} from "~/folder/folder.types";
import { CreateFolder } from "./CreateFolder";
import { CreateFolderWithEvents } from "./CreateFolderWithEvents";
import { CreateFolderWithFolderLevelPermissions } from "./CreateFolderWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

export interface CreateFolderUseCasesTopics {
    onFolderBeforeCreate: Topic<OnFolderBeforeCreateTopicParams>;
    onFolderAfterCreate: Topic<OnFolderAfterCreateTopicParams>;
}

interface CreateFolderUseCasesParams {
    createOperation: AcoFolderStorageOperations["createFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: CreateFolderUseCasesTopics;
}

export const getCreateFolderUseCases = (params: CreateFolderUseCasesParams) => {
    const createFolder = new CreateFolder(params.createOperation);
    const createFolderUseCaseWithEvents = new CreateFolderWithEvents(params.topics, createFolder);
    const createFolderUseCase = new CreateFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        createFolderUseCaseWithEvents
    );

    return {
        createFolderUseCase
    };
};
