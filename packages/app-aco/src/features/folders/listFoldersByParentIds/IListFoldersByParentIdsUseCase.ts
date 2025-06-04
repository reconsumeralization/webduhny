export interface ListFoldersByParentIdsUseCaseParams {
    parentIds?: string[];
}

export interface IListFoldersByParentIdsUseCase {
    execute: (params: ListFoldersByParentIdsUseCaseParams) => Promise<void>;
}
