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
    const createFolderUseCase = new CreateFolderWithEvents(params.topics, createFolder);

    if (params.folderLevelPermissions.canUseFolderLevelPermissions()) {
        const createFolderUseCaseWithFlp = new CreateFolderWithFolderLevelPermissions(
            params.folderLevelPermissions,
            createFolderUseCase
        );

        return {
            createFolderUseCase: createFolderUseCaseWithFlp
        };
    }

    return {
        createFolderUseCase
    };
};
