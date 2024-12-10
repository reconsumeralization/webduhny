import { Abstraction, createImplementation } from "@webiny/di-container";
import { IResetSelectedOptionsUseCase } from "./IResetSelectedOptionsUseCase";
import { IResetSelectedOptionsRepository } from "./IResetSelectedOptionsRepository";
import { ResetSelectedOptionsRepositoryAbstraction } from "./ResetSelectedOptionsRepository";
import { container } from "../container";

export class ResetSelectedOptionsUseCase implements IResetSelectedOptionsUseCase {
    private repository: IResetSelectedOptionsRepository;

    constructor(repository: IResetSelectedOptionsRepository) {
        this.repository = repository;
    }

    async execute() {
        await this.repository.execute();
    }
}

export const ResetSelectedOptionUseCaseAbstraction = new Abstraction<IResetSelectedOptionsUseCase>(
    "ResetSelectedOptionUseCase"
);

const ResetSelectedOptionUseCaseImpl = createImplementation({
    abstraction: ResetSelectedOptionUseCaseAbstraction,
    implementation: ResetSelectedOptionsUseCase,
    dependencies: [ResetSelectedOptionsRepositoryAbstraction]
});

container.register(ResetSelectedOptionUseCaseImpl);
