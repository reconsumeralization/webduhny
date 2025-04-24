import { Topic } from "@webiny/pubsub/types";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterDeleteTopicParams,
    type OnFolderBeforeDeleteTopicParams
} from "~/folder/folder.types";
import { DeleteFolder } from "~/folder/useCases/DeleteFolder/DeleteFolder";
import { DeleteFolderWithEvents } from "~/folder/useCases/DeleteFolder/DeleteFolderWithEvents";
import type { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";
import { DeleteFolderWithFolderLevelPermissions } from "~/folder/useCases/DeleteFolder/DeleteFolderWithFolderLevelPermissions";

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
