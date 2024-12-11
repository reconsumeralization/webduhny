import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISetSelectedOptionUseCase } from "./ISetSelectedOptionUseCase";
import { ISetSelectedOptionRepository } from "./ISetSelectedOptionRepository";
import { SetSelectedOptionRepositoryAbstraction } from "./SetSelectedOptionRepository";
import { container } from "../container";
import { IListCache, OptionsCacheAbstraction } from "../../domains";
import { CommandOption } from "~/Command/CommandOption";

export class SetSelectedOptionUseCase implements ISetSelectedOptionUseCase {
    private repository: ISetSelectedOptionRepository;
    private optionsCache: IListCache<CommandOption>;

    constructor(optionsCache: IListCache<CommandOption>, repository: ISetSelectedOptionRepository) {
        this.optionsCache = optionsCache;
        this.repository = repository;
    }

    async execute(value: string) {
        const option =
            this.optionsCache.getItem(item => item.value === value) ??
            CommandOption.createFromString(value);
        await this.repository.execute(option);
    }
}

export const SetSelectedOptionUseCaseAbstraction = new Abstraction<ISetSelectedOptionUseCase>(
    "SetSelectedOptionUseCase"
);

const SetSelectedOptionUseCaseImpl = createImplementation({
    abstraction: SetSelectedOptionUseCaseAbstraction,
    implementation: SetSelectedOptionUseCase,
    dependencies: [OptionsCacheAbstraction, SetSelectedOptionRepositoryAbstraction]
});

container.register(SetSelectedOptionUseCaseImpl);
