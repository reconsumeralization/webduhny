import { loadingRepositoryFactory } from "@webiny/app-utils";
import { IUpdateFolderUseCase } from "./IUpdateFolderUseCase";
import { IUpdateFolderGateway } from "./IUpdateFolderGateway";
import { UpdateFolderRepository } from "./UpdateFolderRepository";
import { UpdateFolderUseCase } from "./UpdateFolderUseCase";
import { UpdateFolderUseCaseWithLoading } from "./UpdateFolderUseCaseWithLoading";
import { UpdateFolderUseCaseWithoutInheritedPermissions } from "./UpdateFolderUseCaseWithoutInheritedPermissions";
import { folderCacheFactory } from "../cache";

export class UpdateFolder {
    public static getInstance(type: string, gateway: IUpdateFolderGateway): IUpdateFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new UpdateFolderRepository(foldersCache, gateway);
        const useCase = new UpdateFolderUseCase(repository);
        const useCaseWithoutInheritedPermissions =
            new UpdateFolderUseCaseWithoutInheritedPermissions(useCase);
        return new UpdateFolderUseCaseWithLoading(
            loadingRepository,
            useCaseWithoutInheritedPermissions
        );
    }
}
