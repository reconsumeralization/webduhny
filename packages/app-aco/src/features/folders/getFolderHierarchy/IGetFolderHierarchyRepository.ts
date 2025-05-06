export interface GetFolderHierarchyRepositoryParams {
    id: string;
}

export interface IGetFolderHierarchyRepository {
    execute: (params: GetFolderHierarchyRepositoryParams) => Promise<void>;
}
