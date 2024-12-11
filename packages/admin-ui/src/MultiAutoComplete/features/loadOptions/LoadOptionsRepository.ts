import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { ILoadOptionsRepository } from "./ILoadOptionsRepository";
import {
    IListCache,
    OptionsCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains";
import { container } from "../container";

export class LoadOptionsRepository implements ILoadOptionsRepository {
    private optionsCache: IListCache<CommandOption>;
    private selectedOptionsCache: IListCache<CommandOption>;

    constructor(
        optionsCache: IListCache<CommandOption>,
        selectedOptionsCache: IListCache<CommandOption>
    ) {
        this.optionsCache = optionsCache;
        this.selectedOptionsCache = selectedOptionsCache;
    }

    async execute(options: CommandOption[], selectedOptions: CommandOption[]) {
        this.optionsCache.clear();
        this.selectedOptionsCache.clear();
        this.optionsCache.addItems(options);
        this.selectedOptionsCache.addItems(selectedOptions);
    }
}

export const LoadOptionsRepositoryAbstraction = new Abstraction<ILoadOptionsRepository>(
    "LoadOptionsRepository"
);

const LoadOptionsRepositoryImpl = createImplementation({
    abstraction: LoadOptionsRepositoryAbstraction,
    implementation: LoadOptionsRepository,
    dependencies: [OptionsCacheAbstraction, SelectedOptionsCacheAbstraction]
});

container.register(LoadOptionsRepositoryImpl);
