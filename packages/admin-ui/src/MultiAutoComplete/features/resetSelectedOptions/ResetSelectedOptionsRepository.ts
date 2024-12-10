import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { IResetSelectedOptionsRepository } from "./IResetSelectedOptionsRepository";
import {
    IListCache,
    ISearchQueryCache,
    OptionsCacheAbstraction,
    SearchQueryCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains";
import { container } from "../container";

export class ResetSelectedOptionsRepository implements IResetSelectedOptionsRepository {
    private optionsCache: IListCache<CommandOption>;
    private selectedOptionsCache: IListCache<CommandOption>;
    private searchQueryCache: ISearchQueryCache;

    constructor(
        optionsCache: IListCache<CommandOption>,
        selectedOptionsCache: IListCache<CommandOption>,
        searchQueryCache: ISearchQueryCache
    ) {
        this.optionsCache = optionsCache;
        this.selectedOptionsCache = selectedOptionsCache;
        this.searchQueryCache = searchQueryCache;
    }

    async execute() {
        this.optionsCache.updateItems(item => {
            item.selected = false;
            return item;
        });
        this.selectedOptionsCache.clear();
        this.searchQueryCache.setState("");
    }
}

export const ResetSelectedOptionsRepositoryAbstraction =
    new Abstraction<IResetSelectedOptionsRepository>("ResetSelectedOptionsRepository");

const ResetSelectedOptionsRepositoryImpl = createImplementation({
    abstraction: ResetSelectedOptionsRepositoryAbstraction,
    implementation: ResetSelectedOptionsRepository,
    dependencies: [
        OptionsCacheAbstraction,
        SelectedOptionsCacheAbstraction,
        SearchQueryCacheAbstraction
    ]
});

container.register(ResetSelectedOptionsRepositoryImpl);
