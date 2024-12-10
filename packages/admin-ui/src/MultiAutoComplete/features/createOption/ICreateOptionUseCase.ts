export interface ICreateOptionUseCase {
    execute(value: string): Promise<void>;
}
