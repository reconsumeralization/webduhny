export interface FieldValidatorDto {
    type: string;
    params?: any; // Additional parameters for the validator.
}

export abstract class AbstractValidator {
    abstract type: string;

    abstract validate(value: any): boolean;

    abstract getErrorMessage(): string;

    abstract toDto(): FieldValidatorDto;
}
