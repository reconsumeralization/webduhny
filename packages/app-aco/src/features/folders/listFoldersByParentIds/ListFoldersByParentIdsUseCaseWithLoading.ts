import { ILoadingRepository } from "@webiny/app-utils";
import {
    IListFoldersByParentIdsUseCase,
    ListFoldersByParentIdsUseCaseParams
} from "./IListFoldersByParentIdsUseCase";
import { LoadedCache } from "~/features";
import { LoadingActionsEnum } from "~/types";

export class ListFoldersByParentIdsUseCaseWithLoading implements IListFoldersByParentIdsUseCase {
    private loadingRepository: ILoadingRepository;
    private loadedCache: LoadedCache;
    private useCase: IListFoldersByParentIdsUseCase;

    constructor(
        loadingRepository: ILoadingRepository,
        loadedCache: LoadedCache,
        useCase: IListFoldersByParentIdsUseCase
    ) {
        this.loadingRepository = loadingRepository;
        this.loadedCache = loadedCache;
        this.useCase = useCase;
    }

    async execute(params: ListFoldersByParentIdsUseCaseParams) {
        let action: string = LoadingActionsEnum.init;

        if (params.parentIds?.length) {
            action = params.parentIds
                .filter(parentId => !this.loadedCache.getItems().includes(parentId))
                .join(":");
        }

        if (action) {
            await this.loadingRepository.runCallBack(this.useCase.execute(params), action);
        } else {
            await this.useCase.execute(params);
        }
    }
}
