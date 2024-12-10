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
        await this.repository.execute(this.mapOptions(options, selectedValues));
    }

    private mapOptions(
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
