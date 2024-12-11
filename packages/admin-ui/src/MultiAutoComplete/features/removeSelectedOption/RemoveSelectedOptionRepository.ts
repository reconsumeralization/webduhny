import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { IRemoveSelectedOptionRepository } from "./IRemoveSelectedOptionRepository";
import {
    IListCache,
    OptionsCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains/";
import { container } from "../container";

export class RemoveSelectedOptionRepository implements IRemoveSelectedOptionRepository {
    private optionsCache: IListCache<CommandOption>;
    private selectedOptionsCache: IListCache<CommandOption>;

    constructor(
        optionsCache: IListCache<CommandOption>,
        selectedOptionsCache: IListCache<CommandOption>
    ) {
        this.optionsCache = optionsCache;
        this.selectedOptionsCache = selectedOptionsCache;
    }

    async execute(value: string) {
        this.selectedOptionsCache.removeItems(opt => opt.value === value);

        const option = this.optionsCache.getItem(item => item.value === value);
        if (option) {
            option.selected = false;
        }
    }
}

export const RemoveSelectedOptionRepositoryAbstraction =
    new Abstraction<IRemoveSelectedOptionRepository>("RemoveSelectedOptionRepository");

const RemoveSelectedOptionRepositoryImpl = createImplementation({
    abstraction: RemoveSelectedOptionRepositoryAbstraction,
    implementation: RemoveSelectedOptionRepository,
    dependencies: [OptionsCacheAbstraction, SelectedOptionsCacheAbstraction]
});

container.register(RemoveSelectedOptionRepositoryImpl);
