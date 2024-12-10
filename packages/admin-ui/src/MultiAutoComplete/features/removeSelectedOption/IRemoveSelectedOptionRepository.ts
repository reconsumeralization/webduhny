export interface IRemoveSelectedOptionRepository {
    execute: (value: string) => Promise<void>;
}
