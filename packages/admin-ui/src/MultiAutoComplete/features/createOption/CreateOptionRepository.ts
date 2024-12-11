import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { ICreateOptionRepository } from "./ICreateOptionRepository";
import {
    IListCache,
    ISearchQueryCache,
    SearchQueryCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains";
import { container } from "../container";

class CreateOptionRepository implements ICreateOptionRepository {
    private selectedOptionsCache: IListCache<CommandOption>;
    private searchQueryCache: ISearchQueryCache;

    constructor(
        selectedOptionsCache: IListCache<CommandOption>,
        searchQueryCache: ISearchQueryCache
    ) {
        this.selectedOptionsCache = selectedOptionsCache;
        this.searchQueryCache = searchQueryCache;
    }

    async execute(option: CommandOption) {
        option.selected = true;
        this.selectedOptionsCache.addItems([option]);
        this.searchQueryCache.setState("");
    }
}

export const CreateOptionRepositoryAbstraction = new Abstraction<ICreateOptionRepository>(
    "CreateOptionRepository"
);

const CreateOptionRepositoryImpl = createImplementation({
    abstraction: CreateOptionRepositoryAbstraction,
    implementation: CreateOptionRepository,
    dependencies: [SelectedOptionsCacheAbstraction, SearchQueryCacheAbstraction]
});

container.register(CreateOptionRepositoryImpl);
