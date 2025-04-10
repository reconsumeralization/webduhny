import { IGetFolderModelGateway } from "./IGetFolderModelGateway";
import { GetFolderModelRepository } from "./GetFolderModelRepository";
import { GetFolderModelUseCase } from "./GetFolderModelUseCase";
import { IGetFolderModelUseCase } from "./IGetFolderModelUseCase";
import { IGetFolderModelRepository } from "./IGetFolderModelRepository";

interface IGetFolderModelInstance {
    useCase: IGetFolderModelUseCase;
    repository: IGetFolderModelRepository;
}

export class GetFolderModel {
    public static getInstance(gateway: IGetFolderModelGateway): IGetFolderModelInstance {
        const repository = new GetFolderModelRepository(gateway);
        const useCase = new GetFolderModelUseCase(repository);

        return {
            useCase,
            repository
        };
    }
}
