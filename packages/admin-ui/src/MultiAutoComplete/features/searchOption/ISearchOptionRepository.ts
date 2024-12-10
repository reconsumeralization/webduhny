export interface ISearchOptionRepository {
    execute: (value: string) => Promise<void>;
}
