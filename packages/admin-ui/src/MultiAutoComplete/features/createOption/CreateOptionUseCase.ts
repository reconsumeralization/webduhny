import { Abstraction, createImplementation } from "@webiny/di-container";
import { ICreateOptionUseCase } from "./ICreateOptionUseCase";
import { ICreateOptionRepository } from "./ICreateOptionRepository";
import { CommandOption } from "~/Command/CommandOption";
import { CreateOptionRepositoryAbstraction } from "./CreateOptionRepository";
import { container } from "../container";

export class CreateOptionUseCase implements ICreateOptionUseCase {
    private repository: ICreateOptionRepository;

    constructor(repository: ICreateOptionRepository) {
        this.repository = repository;
    }

    async execute(value: string) {
        await this.repository.execute(CommandOption.createFromString(value));
    }
}

export const CreateOptionUseCaseAbstraction = new Abstraction<ICreateOptionUseCase>(
    "CreateOptionUseCase"
);

const CreateOptionUseCaseImpl = createImplementation({
    abstraction: CreateOptionUseCaseAbstraction,
    implementation: CreateOptionUseCase,
    dependencies: [CreateOptionRepositoryAbstraction]
});

container.register(CreateOptionUseCaseImpl);
