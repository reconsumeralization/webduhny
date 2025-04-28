import { Topic } from "@webiny/pubsub/types";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterDeleteTopicParams,
    type OnFolderBeforeDeleteTopicParams
} from "~/folder/folder.types";
import { DeleteFolder } from "./DeleteFolder";
import { DeleteFolderWithEvents } from "./DeleteFolderWithEvents";
import { DeleteFolderWithFolderLevelPermissions } from "./DeleteFolderWithFolderLevelPermissions";
import { FolderLevelPermissions } from "~/flp";

export interface DeleteFolderUseCasesTopics {
    onFolderBeforeDelete: Topic<OnFolderBeforeDeleteTopicParams>;
    onFolderAfterDelete: Topic<OnFolderAfterDeleteTopicParams>;
}

interface DeleteFolderUseCasesParams {
    deleteOperation: AcoFolderStorageOperations["deleteFolder"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: DeleteFolderUseCasesTopics;
}

export const getDeleteFolderUseCases = (params: DeleteFolderUseCasesParams) => {
    const deleteFolder = new DeleteFolder(params.deleteOperation);
    const deleteFolderUseCase = new DeleteFolderWithEvents(
        params.topics,
        params.getOperation,
        deleteFolder
    );

    const deleteFolderUseCaseWithFlp = new DeleteFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        params.getOperation,
        deleteFolderUseCase
    );

    return {
        deleteFolderUseCase: deleteFolderUseCaseWithFlp
    };
};
