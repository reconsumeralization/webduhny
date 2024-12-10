import { MultiAutoCompleteOption } from "../../domains";

export interface ILoadOptionsUseCase {
    execute: (options: MultiAutoCompleteOption[], selectedValues: string[]) => Promise<void>;
}
