import { Topic } from "@webiny/pubsub/types";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterCreateTopicParams,
    type OnFolderBeforeCreateTopicParams
} from "~/folder/folder.types";
import { CreateFolder } from "~/folder/useCases/CreateFolder/CreateFolder";
import { CreateFolderWithEvents } from "~/folder/useCases/CreateFolder/CreateFolderWithEvents";
import type { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";
import { CreateFolderWithFolderLevelPermissions } from "~/folder/useCases/CreateFolder/CreateFolderWithFolderLevelPermissions";

export interface CreateFolderUseCasesTopics {
    onFolderBeforeCreate: Topic<OnFolderBeforeCreateTopicParams>;
    onFolderAfterCreate: Topic<OnFolderAfterCreateTopicParams>;
}

interface CreateFolderUseCasesParams {
    createOperation: AcoFolderStorageOperations["createFolder"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: CreateFolderUseCasesTopics;
}

export const getCreateFolderUseCases = (params: CreateFolderUseCasesParams) => {
    const createFolder = new CreateFolder(params.createOperation);
    const createFolderUseCase = new CreateFolderWithEvents(params.topics, createFolder);

    const createFolderUseCaseWithFlp = new CreateFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        params.getOperation,
        createFolderUseCase
    );

    return {
        createFolderUseCase: createFolderUseCaseWithFlp
    };
};
