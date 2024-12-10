export interface ISetSelectedOptionUseCase {
    execute: (value: string) => Promise<void>;
}
