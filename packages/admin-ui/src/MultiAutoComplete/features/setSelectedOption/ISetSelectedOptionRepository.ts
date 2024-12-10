export interface ISetSelectedOptionRepository {
    execute: (value: string) => Promise<void>;
}
