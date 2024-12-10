import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISearchQueryCache, SearchQueryCacheAbstraction } from "../../domains";
import { ISearchOptionRepository } from "./ISearchOptionRepository";
import { container } from "../container";

export class SearchOptionRepository implements ISearchOptionRepository {
    private searchQueryCache: ISearchQueryCache;

    constructor(searchQueryCache: ISearchQueryCache) {
        this.searchQueryCache = searchQueryCache;
    }

    async execute(query: string) {
        this.searchQueryCache.setState(query);
    }
}

export const SearchOptionRepositoryAbstraction = new Abstraction<ISearchOptionRepository>(
    "SearchOptionRepository"
);

const SearchOptionRepositoryImpl = createImplementation({
    abstraction: SearchOptionRepositoryAbstraction,
    implementation: SearchOptionRepository,
    dependencies: [SearchQueryCacheAbstraction]
});

container.register(SearchOptionRepositoryImpl);
