import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { ISetSelectedOptionRepository } from "./ISetSelectedOptionRepository";
import {
    IListCache,
    ISearchQueryCache,
    OptionsCacheAbstraction,
    SearchQueryCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains";
import { container } from "../container";

export class SetSelectedOptionRepository implements ISetSelectedOptionRepository {
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

    async execute(value: string) {
        const option = this.optionsCache.getItem(item => item.value === value);
        if (option) {
            option.selected = true;
            this.selectedOptionsCache.addItems([option]);
        }
        this.searchQueryCache.setState("");
    }
}

export const SetSelectedOptionRepositoryAbstraction = new Abstraction<ISetSelectedOptionRepository>(
    "SetSelectedOptionRepository"
);

const SetSelectedOptionRepositoryImpl = createImplementation({
    abstraction: SetSelectedOptionRepositoryAbstraction,
    implementation: SetSelectedOptionRepository,
    dependencies: [
        OptionsCacheAbstraction,
        SelectedOptionsCacheAbstraction,
        SearchQueryCacheAbstraction
    ]
});

container.register(SetSelectedOptionRepositoryImpl);
