import { createTopic } from "@webiny/pubsub";
import { type AcoContext, CreateAcoParams, Folder } from "~/types";
import {
    AcoFolderCrud,
    OnFolderAfterCreateTopicParams,
    OnFolderAfterDeleteTopicParams,
    OnFolderAfterUpdateTopicParams,
    OnFolderBeforeCreateTopicParams,
    OnFolderBeforeDeleteTopicParams,
    OnFolderBeforeUpdateTopicParams
} from "./folder.types";
import {
    getCreateFolderUseCases,
    getDeleteFolderUseCases,
    getGetAncestors,
    getGetFolderUseCase,
    getListFolderLevelPermissionsTargets,
    getListFoldersUseCases,
    getUpdateFolderUseCase
} from "~/folder/useCases";

const FIXED_FOLDER_LISTING_LIMIT = 10_000;

interface CreateFolderCrudMethodsParams extends CreateAcoParams {
    context: AcoContext;
}

export const createFolderCrudMethods = ({
    storageOperations,
    folderLevelPermissions,
    context
}: CreateFolderCrudMethodsParams): AcoFolderCrud => {
    // create
    const onFolderBeforeCreate = createTopic<OnFolderBeforeCreateTopicParams>(
        "aco.onFolderBeforeCreate"
    );
    const onFolderAfterCreate =
        createTopic<OnFolderAfterCreateTopicParams>("aco.onFolderAfterCreate");
    // update
    const onFolderBeforeUpdate = createTopic<OnFolderBeforeUpdateTopicParams>(
        "aco.onFolderBeforeUpdate"
    );
    const onFolderAfterUpdate =
        createTopic<OnFolderAfterUpdateTopicParams>("aco.onFolderAfterUpdate");
    // delete
    const onFolderBeforeDelete = createTopic<OnFolderBeforeDeleteTopicParams>(
        "aco.onFolderBeforeDelete"
    );
    const onFolderAfterDelete =
        createTopic<OnFolderAfterDeleteTopicParams>("aco.onFolderAfterDelete");

    const { getFolderUseCase } = getGetFolderUseCase({
        getOperation: storageOperations.folder.getFolder,
        folderLevelPermissions
    });

    const { listFoldersUseCase } = getListFoldersUseCases({
        listOperation: storageOperations.folder.listFolders,
        folderLevelPermissions
    });

    const { createFolderUseCase } = getCreateFolderUseCases({
        createOperation: storageOperations.folder.createFolder,
        getOperation: storageOperations.folder.getFolder,
        folderLevelPermissions,
        topics: {
            onFolderAfterCreate,
            onFolderBeforeCreate
        }
    });

    const { updateFolderUseCase } = getUpdateFolderUseCase({
        updateOperation: storageOperations.folder.updateFolder,
        getOperation: storageOperations.folder.getFolder,
        folderLevelPermissions,
        topics: {
            onFolderAfterUpdate,
            onFolderBeforeUpdate
        }
    });

    const { deleteFolderUseCase } = getDeleteFolderUseCases({
        deleteOperation: storageOperations.folder.deleteFolder,
        getOperation: storageOperations.folder.getFolder,
        folderLevelPermissions,
        topics: {
            onFolderBeforeDelete,
            onFolderAfterDelete
        }
    });

    const { getAncestorsUseCase } = getGetAncestors();

    const { listFolderLevelPermissionsTargetsUseCase } = getListFolderLevelPermissionsTargets({
        context
    });

    return {
        /**
         * Lifecycle events
         */
        onFolderBeforeCreate,
        onFolderAfterCreate,
        onFolderBeforeUpdate,
        onFolderAfterUpdate,
        onFolderBeforeDelete,
        onFolderAfterDelete,

        async get(id) {
            return await getFolderUseCase.execute({ id });
        },

        async list(params) {
            return await listFoldersUseCase.execute(params);
        },

        async listAll(params) {
            return await listFoldersUseCase.execute({
                ...params,
                limit: FIXED_FOLDER_LISTING_LIMIT
            });
        },

        async create(data) {
            return await createFolderUseCase.execute(data);
        },

        async delete(id) {
            return await deleteFolderUseCase.execute({ id });
        },

        async update(id, data) {
            return await updateFolderUseCase.execute(id, data);
        },

        async getAncestors(folder: Folder) {
            const [folders] = await this.listAll({ where: { type: folder.type } });
            return getAncestorsUseCase.execute({ folder, folders });
        },

        /**
         * @deprecated use `getAncestors` instead
         */
        async getFolderWithAncestors(id: string) {
            const folder = await this.get(id);
            return this.getAncestors(folder);
        },

        async listFolderLevelPermissionsTargets() {
            return await listFolderLevelPermissionsTargetsUseCase.execute();
        }
    };
};
