import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command";
import { ICreateOptionRepository } from "./ICreateOptionRepository";
import {
    IListCache,
    OptionsCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../../domains";
import { container } from "../container";

class CreateOptionRepository implements ICreateOptionRepository {
    private optionsCache: IListCache<CommandOption>;
    private selectedOptionsCache: IListCache<CommandOption>;

    constructor(
        optionsCache: IListCache<CommandOption>,
        selectedOptionsCache: IListCache<CommandOption>
    ) {
        this.optionsCache = optionsCache;
        this.selectedOptionsCache = selectedOptionsCache;
    }

    async execute(option: CommandOption) {
        option.selected = true;
        this.optionsCache.addItems([option]);
        this.selectedOptionsCache.addItems([option]);
    }
}

export const CreateOptionRepositoryAbstraction = new Abstraction<ICreateOptionRepository>(
    "CreateOptionRepository"
);

const CreateOptionRepositoryImpl = createImplementation({
    abstraction: CreateOptionRepositoryAbstraction,
    implementation: CreateOptionRepository,
    dependencies: [OptionsCacheAbstraction, SelectedOptionsCacheAbstraction]
});

container.register(CreateOptionRepositoryImpl);
