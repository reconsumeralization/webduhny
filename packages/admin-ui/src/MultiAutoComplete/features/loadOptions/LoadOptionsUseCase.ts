import { Abstraction, createImplementation } from "@webiny/di-container";
import { ILoadOptionsUseCase } from "./ILoadOptionsUseCase";
import { LoadOptionsRepository, LoadOptionsRepositoryAbstraction } from "./LoadOptionsRepository";
import { MultiAutoCompleteOption } from "../../domains";
import { CommandOption } from "~/Command/CommandOption";
import { container } from "../container";

export class LoadOptionsUseCase implements ILoadOptionsUseCase {
    private repository: LoadOptionsRepository;

    constructor(repository: LoadOptionsRepository) {
        this.repository = repository;
    }

    async execute(options: MultiAutoCompleteOption[], selectedValues: string[] = []) {
        const commandOptions = this.getOptions(options, selectedValues);
        const selectedCommandOptions = this.getSelectedCommandOptions(
            commandOptions,
            selectedValues
        );
        await this.repository.execute(commandOptions, selectedCommandOptions);
    }

    private getOptions(
        options: MultiAutoCompleteOption[] = [],
        values: string[] = []
    ): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = values.includes(commandOption.value);

            return commandOption;
        });
    }

    private getSelectedCommandOptions(
        commandOptions: CommandOption[],
        values: string[]
    ): CommandOption[] {
        return values.map(value => {
            const option = commandOptions.find(option => option.value === value);

            if (!option) {
                return CommandOption.createFromString(value);
            }

            return option;
        });
    }
}

export const LoadOptionsUseCaseAbstraction = new Abstraction<ILoadOptionsUseCase>(
    "LoadOptionsUseCase"
);

const LoadOptionsUseCaseImpl = createImplementation({
    abstraction: LoadOptionsUseCaseAbstraction,
    implementation: LoadOptionsUseCase,
    dependencies: [LoadOptionsRepositoryAbstraction]
});

container.register(LoadOptionsUseCaseImpl);
