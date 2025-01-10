import {
    GetFolderLevelPermissionParams,
    IGetFolderLevelPermissionUseCase
} from "./IGetFolderLevelPermissionUseCase";
import { IGetFolderLevelPermissionRepository } from "./IGetFolderLevelPermissionRepository";

export class GetFolderLevelPermissionWithFlpUseCase implements IGetFolderLevelPermissionUseCase {
    private repository: IGetFolderLevelPermissionRepository;

    constructor(repository: IGetFolderLevelPermissionRepository) {
        this.repository = repository;
    }

    execute(params: GetFolderLevelPermissionParams) {
        return this.repository.execute(params.id);
    }
}
