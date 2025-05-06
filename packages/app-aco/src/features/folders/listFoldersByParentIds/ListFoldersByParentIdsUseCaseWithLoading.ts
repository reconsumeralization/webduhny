import { ILoadingRepository } from "@webiny/app-utils";
import {
    IListFoldersByParentIdsUseCase,
    ListFoldersByParentIdsUseCaseParams
} from "./IListFoldersByParentIdsUseCase";

export class ListFoldersByParentIdsUseCaseWithLoading implements IListFoldersByParentIdsUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IListFoldersByParentIdsUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IListFoldersByParentIdsUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: ListFoldersByParentIdsUseCaseParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            params.parentIds?.join(":") || ""
        );
    }
}
