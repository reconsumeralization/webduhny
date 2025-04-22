import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface GteValidatorParams {
    threshold: number;
}

export class GteValidator extends AbstractValidator {
    type = "gte";
    params: GteValidatorParams;

    constructor(params: GteValidatorParams) {
        super();
        this.params = params;
    }

    validate(value: any) {
        const validators = `gte:${this.params.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }

    getErrorMessage() {
        return `Value must be greater than or equal to ${this.params.threshold}.`;
    }

    toDto() {
        return { type: this.type, value: this.params.threshold };
    }
}
