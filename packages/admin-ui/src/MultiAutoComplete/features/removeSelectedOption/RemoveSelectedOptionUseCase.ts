import { Abstraction, createImplementation } from "@webiny/di-container";
import { IRemoveSelectedOptionUseCase } from "./IRemoveSelectedOptionUseCase";
import { IRemoveSelectedOptionRepository } from "./IRemoveSelectedOptionRepository";
import { RemoveSelectedOptionRepositoryAbstraction } from "./RemoveSelectedOptionRepository";
import { container } from "../container";

export class RemoveSelectedOptionUseCase implements IRemoveSelectedOptionUseCase {
    private repository: IRemoveSelectedOptionRepository;

    constructor(repository: IRemoveSelectedOptionRepository) {
        this.repository = repository;
    }

    async execute(value: string) {
        await this.repository.execute(value);
    }
}

export const RemoveSelectedOptionUseCaseAbstraction = new Abstraction<IRemoveSelectedOptionUseCase>(
    "RemoveSelectedOptionUseCase"
);

const RemoveSelectedOptionUseCaseImpl = createImplementation({
    abstraction: RemoveSelectedOptionUseCaseAbstraction,
    implementation: RemoveSelectedOptionUseCase,
    dependencies: [RemoveSelectedOptionRepositoryAbstraction]
});

container.register(RemoveSelectedOptionUseCaseImpl);
