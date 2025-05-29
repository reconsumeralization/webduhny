export interface GetFolderHierarchyUseCaseParams {
    id: string;
}

export interface IGetFolderHierarchyUseCase {
    execute: (params: GetFolderHierarchyUseCaseParams) => Promise<void>;
}
