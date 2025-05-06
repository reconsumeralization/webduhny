import { ILoadingRepository } from "@webiny/app-utils";
import {
    GetFolderHierarchyUseCaseParams,
    IGetFolderHierarchyUseCase
} from "./IGetFolderHierarchyUseCase";

export class GetFolderHierarchyUseCaseWithLoading implements IGetFolderHierarchyUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IGetFolderHierarchyUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IGetFolderHierarchyUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: GetFolderHierarchyUseCaseParams) {
        await this.loadingRepository.runCallBack(this.useCase.execute(params), params.id);
    }
}
