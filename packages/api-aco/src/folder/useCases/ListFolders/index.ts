import type { AcoFolderStorageOperations } from "~/folder/folder.types";
import { ListFolders } from "~/folder/useCases/ListFolders/ListFolders";

interface ListFoldersUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
}

export const getListFoldersUseCases = (params: ListFoldersUseCasesParams) => {
    const listFolders = new ListFolders(params.listOperation);

    return {
        listFoldersUseCase: listFolders
    };
};
