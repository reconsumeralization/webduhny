export interface ListFoldersByParentIdsRepositoryParams {
    parentIds: string[];
}

export interface IListFoldersByParentIdsRepository {
    execute: (params: ListFoldersByParentIdsRepositoryParams) => Promise<void>;
}
