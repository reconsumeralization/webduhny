import { validation } from "@webiny/validation";
import {AbstractValidator} from "./AbstractValidator";

interface LteValidatorParams {
    threshold: number;
}

export class LteValidator extends AbstractValidator {
    type = "lte";
    params: LteValidatorParams;

    constructor(params: LteValidatorParams) {
        super();
        this.params = params;
    }

    validate(value: any) {
        const validators = `lte:${this.params.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }

    getErrorMessage() {
        return `Value must be less than or equal to ${this.params.threshold}.`;
    }

    toDto() {
        return { type: this.type, value: this.params.threshold };
    }
}
