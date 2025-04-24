export interface FieldValidatorParams<TExtra = {}> {
    errorMessage: string; // Error message to be displayed when validation fails.
    extra: TExtra;
}

export interface FieldValidatorDto<TExtraParams = {}> {
    type: string;
    params: FieldValidatorParams<TExtraParams>; // Additional parameters for the validator.
}

export abstract class AbstractValidator<TExtraParams = {}> {
    abstract type: string;
    abstract params: FieldValidatorParams<TExtraParams>;

    abstract validate(value: any): boolean;

    getErrorMessage() {
        return this.params.errorMessage;
    }

    toDto(): FieldValidatorDto<TExtraParams> {
        return { type: this.type, params: this.params };
    }
}
