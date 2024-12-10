import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISearchOptionRepository } from "./ISearchOptionRepository";
import { ISearchOptionUseCase } from "./ISearchOptionUseCase";
import { SearchOptionRepositoryAbstraction } from "./SearchOptionRepository";
import { container } from "../container";

export class SearchOptionUseCase implements ISearchOptionUseCase {
    private repository: ISearchOptionRepository;

    constructor(repository: ISearchOptionRepository) {
        this.repository = repository;
    }

    async execute(query: string) {
        await this.repository.execute(query);
    }
}

export const SearchOptionUseCaseAbstraction = new Abstraction<ISearchOptionUseCase>(
    "SearchOptionUseCase"
);

const SearchOptionUseCaseImpl = createImplementation({
    abstraction: SearchOptionUseCaseAbstraction,
    implementation: SearchOptionUseCase,
    dependencies: [SearchOptionRepositoryAbstraction]
});

container.register(SearchOptionUseCaseImpl);
