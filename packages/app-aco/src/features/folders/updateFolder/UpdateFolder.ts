import { loadingRepositoryFactory } from "@webiny/app-utils";
import { IUpdateFolderUseCase } from "./IUpdateFolderUseCase";
import { IUpdateFolderGateway } from "./IUpdateFolderGateway";
import { UpdateFolderRepository } from "./UpdateFolderRepository";
import { UpdateFolderRepositoryWithPermissionsChange } from "./UpdateFolderRepositoryWithPermissionsChange";
import { UpdateFolderUseCase } from "./UpdateFolderUseCase";
import { UpdateFolderUseCaseWithLoading } from "./UpdateFolderUseCaseWithLoading";
import { UpdateFolderUseCaseWithoutInheritedPermissions } from "./UpdateFolderUseCaseWithoutInheritedPermissions";
import { folderCacheFactory } from "../cache";
import { UpdateFolderRepositoryWithPathChange } from "~/features/folders/updateFolder/UpdateFolderRepositoryWithPathChange";

export class UpdateFolder {
    public static getInstance(type: string, gateway: IUpdateFolderGateway): IUpdateFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);

        const repository = new UpdateFolderRepository(foldersCache, gateway);
        const repositoryWithPathChange = new UpdateFolderRepositoryWithPathChange(
            foldersCache,
            repository
        );
        const repositoryWithPermissionsChange = new UpdateFolderRepositoryWithPermissionsChange(
            foldersCache,
            repositoryWithPathChange
        );

        const useCase = new UpdateFolderUseCase(repositoryWithPermissionsChange);
        const useCaseWithoutInheritedPermissions =
            new UpdateFolderUseCaseWithoutInheritedPermissions(useCase);
        return new UpdateFolderUseCaseWithLoading(
            loadingRepository,
            useCaseWithoutInheritedPermissions
        );
    }
}
