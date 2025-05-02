import { Topic } from "@webiny/pubsub/types";
import type {
    AcoFolderStorageOperations,
    OnFolderAfterUpdateTopicParams,
    OnFolderBeforeUpdateTopicParams
} from "~/folder/folder.types";
import { UpdateFolder } from "./UpdateFolder";
import { UpdateFolderWithEvents } from "./UpdateFolderWithEvents";
import { UpdateFolderWithFolderLevelPermissions } from "./UpdateFolderWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

export interface UpdateFolderUseCasesTopics {
    onFolderBeforeUpdate: Topic<OnFolderBeforeUpdateTopicParams>;
    onFolderAfterUpdate: Topic<OnFolderAfterUpdateTopicParams>;
}

interface UpdateFolderUseCasesParams {
    updateOperation: AcoFolderStorageOperations["updateFolder"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: UpdateFolderUseCasesTopics;
}

export const getUpdateFolderUseCase = (params: UpdateFolderUseCasesParams) => {
    const updateFolder = new UpdateFolder(params.updateOperation);
    const updateFolderUseCaseWithEvents = new UpdateFolderWithEvents(
        params.topics,
        params.getOperation,
        updateFolder
    );
    const updateFolderUseCase = new UpdateFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        params.getOperation,
        updateFolderUseCaseWithEvents
    );

    return {
        updateFolderUseCase
    };
};
