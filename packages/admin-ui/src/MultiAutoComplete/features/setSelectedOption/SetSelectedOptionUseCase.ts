import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISetSelectedOptionUseCase } from "./ISetSelectedOptionUseCase";
import { ISetSelectedOptionRepository } from "./ISetSelectedOptionRepository";
import { SetSelectedOptionRepositoryAbstraction } from "./SetSelectedOptionRepository";
import { container } from "../container";

export class SetSelectedOptionUseCase implements ISetSelectedOptionUseCase {
    private repository: ISetSelectedOptionRepository;

    constructor(repository: ISetSelectedOptionRepository) {
        this.repository = repository;
    }

    async execute(value: string) {
        await this.repository.execute(value);
    }
}

export const SetSelectedOptionUseCaseAbstraction = new Abstraction<ISetSelectedOptionUseCase>(
    "SetSelectedOptionUseCase"
);

const SetSelectedOptionUseCaseImpl = createImplementation({
    abstraction: SetSelectedOptionUseCaseAbstraction,
    implementation: SetSelectedOptionUseCase,
    dependencies: [SetSelectedOptionRepositoryAbstraction]
});

container.register(SetSelectedOptionUseCaseImpl);
