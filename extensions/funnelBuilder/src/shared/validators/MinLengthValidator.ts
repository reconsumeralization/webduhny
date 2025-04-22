import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface MinLengthValidatorParams {
    threshold: number;
}

export class MinLengthValidator extends AbstractValidator {
    type = "minLength";
    params: MinLengthValidatorParams;

    constructor(params: MinLengthValidatorParams) {
        super();
        this.params = params;
    }

    validate(value: any) {
        const validators = `minLength:${this.params.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }

    getErrorMessage() {
        return `Value must be less than or equal to ${this.params.threshold} characters long.`;
    }

    toDto() {
        return { type: this.type, value: this.params.threshold };
    }
}
