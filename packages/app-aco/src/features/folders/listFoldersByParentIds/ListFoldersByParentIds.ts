import { LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { IListFoldersByParentIdsGateway } from "./IListFoldersByParentIdsGateway";
import { IListFoldersByParentIdsUseCase } from "./IListFoldersByParentIdsUseCase";
import { ListFoldersByParentIdsRepository } from "./ListFoldersByParentIdsRepository";
import { ListFoldersByParentIdsRepositoryWithLoadedCache } from "./ListFoldersByParentIdsRepositoryWithLoadedCache";
import { ListFoldersByParentIdsUseCase } from "./ListFoldersByParentIdsUseCase";
import { folderCacheFactory, ListCache, loadedFolderCacheFactory } from "../cache";
import { Folder } from "../Folder";
import { ListFoldersByParentIdsUseCaseWithLoading } from "~/features/folders/listFoldersByParentIds/ListFoldersByParentIdsUseCaseWithLoading";

interface IListFoldersByParentIdsInstance {
    useCase: IListFoldersByParentIdsUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class ListFoldersByParentIds {
    public static getInstance(
        type: string,
        gateway: IListFoldersByParentIdsGateway
    ): IListFoldersByParentIdsInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadedCache = loadedFolderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new ListFoldersByParentIdsRepository(foldersCache, gateway, type);
        const repositoryWithLoadedCache = new ListFoldersByParentIdsRepositoryWithLoadedCache(
            loadedCache,
            repository
        );
        const useCase = new ListFoldersByParentIdsUseCase(repositoryWithLoadedCache);
        const useCaseWithLoading = new ListFoldersByParentIdsUseCaseWithLoading(
            loadingRepository,
            loadedCache,
            useCase
        );

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
