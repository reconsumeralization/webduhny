import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface MaxLengthValidatorExtraParams {
    threshold?: number;
}

export class MaxLengthValidator extends AbstractValidator<MaxLengthValidatorExtraParams> {
    type = "maxLength";
    params = {
        errorMessage: "Value is too long.",
        extra: { threshold: undefined }
    };

    validate(value: any) {
        const validators = `maxLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
