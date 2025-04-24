import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface MinLengthValidatorExtraParams {
    threshold?: number;
}

export class MinLengthValidator extends AbstractValidator<MinLengthValidatorExtraParams> {
    type = "minLength";
    params = {
        errorMessage: "Value is too short.",
        extra: { threshold: undefined }
    };

    validate(value: any) {
        const validators = `minLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
