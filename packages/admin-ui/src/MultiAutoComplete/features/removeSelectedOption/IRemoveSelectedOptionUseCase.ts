export interface IRemoveSelectedOptionUseCase {
    execute: (value: string) => Promise<void>;
}
