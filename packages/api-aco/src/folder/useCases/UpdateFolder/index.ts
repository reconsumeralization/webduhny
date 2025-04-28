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
    const updateFolderUseCase = new UpdateFolderWithEvents(
        params.topics,
        params.getOperation,
        updateFolder
    );

    if (params.folderLevelPermissions.canUseFolderLevelPermissions()) {
        const updateFolderUseCaseWithFlp = new UpdateFolderWithFolderLevelPermissions(
            params.folderLevelPermissions,
            params.getOperation,
            updateFolderUseCase
        );

        return {
            updateFolderUseCase: updateFolderUseCaseWithFlp
        };
    }

    return {
        updateFolderUseCase
    };
};
