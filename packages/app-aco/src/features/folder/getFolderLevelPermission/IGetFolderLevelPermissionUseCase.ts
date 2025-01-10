export interface GetFolderLevelPermissionParams {
    id: string;
}

export interface IGetFolderLevelPermissionUseCase {
    execute: (params: GetFolderLevelPermissionParams) => boolean;
}
