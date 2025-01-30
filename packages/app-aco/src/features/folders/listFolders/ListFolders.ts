import { LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { IListFoldersUseCase } from "./IListFoldersUseCase";
import { IListFoldersGateway } from "./IListFoldersGateway";
import { ListFoldersRepository } from "./ListFoldersRepository";
import { ListFoldersUseCaseWithLoading } from "./ListFoldersUseCaseWithLoading";
import { ListFoldersUseCase } from "./ListFoldersUseCase";
import { folderCacheFactory, ListCache } from "../cache";
import { Folder } from "../Folder";

interface IListFoldersInstance {
    useCase: IListFoldersUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class ListFolders {
    public static getInstance(type: string, gateway: IListFoldersGateway): IListFoldersInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new ListFoldersRepository(foldersCache, gateway, type);
        const useCase = new ListFoldersUseCase(repository);
        const useCaseWithLoading = new ListFoldersUseCaseWithLoading(loadingRepository, useCase);

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
