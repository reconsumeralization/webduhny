export interface ISearchOptionUseCase {
    execute: (value: string) => Promise<void>;
}
