import { LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { IGetFolderHierarchyUseCase } from "./IGetFolderHierarchyUseCase";
import { IGetFolderHierarchyGateway } from "./IGetFolderHierarchyGateway";
import { GetFolderHierarchyUseCaseWithLoading } from "./GetFolderHierarchyUseCaseWithLoading";
import { GetFolderHierarchyRepository } from "./GetFolderHierarchyRepository";
import { GetFolderHierarchyUseCase } from "./GetFolderHierarchyUseCase";
import { folderCacheFactory, ListCache, loadedFolderCacheFactory } from "../cache";
import { Folder } from "../Folder";

interface IGetFolderHierarchyInstance {
    useCase: IGetFolderHierarchyUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class GetFolderHierarchy {
    public static getInstance(
        type: string,
        gateway: IGetFolderHierarchyGateway
    ): IGetFolderHierarchyInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadedCache = loadedFolderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new GetFolderHierarchyRepository(
            foldersCache,
            loadedCache,
            gateway,
            type
        );
        const useCase = new GetFolderHierarchyUseCase(repository);
        const useCaseWithLoading = new GetFolderHierarchyUseCaseWithLoading(
            loadingRepository,
            useCase
        );

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
