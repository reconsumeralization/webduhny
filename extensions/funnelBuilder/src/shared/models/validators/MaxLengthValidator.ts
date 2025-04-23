import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface MaxLengthValidatorParams {
    threshold: number;
}

export class MaxLengthValidator extends AbstractValidator {
    type = "maxLength";
    params: MaxLengthValidatorParams;

    constructor(params: MaxLengthValidatorParams) {
        super();
        this.params = params;
    }

    validate(value: any) {
        const validators = `maxLength:${this.params.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }

    getErrorMessage() {
        return `This field must be at most ${this.params.threshold} characters long.`;
    }

    toDto() {
        return { type: this.type, value: this.params.threshold };
    }
}
