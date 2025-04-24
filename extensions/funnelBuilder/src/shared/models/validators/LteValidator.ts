import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface LteValidatorExtraParams {
    threshold?: number;
}

export class LteValidator extends AbstractValidator<LteValidatorExtraParams> {
    type = "lte";
    params = {
        errorMessage: "Value is too great.",
        extra: { threshold: undefined }
    };

    validate(value: any) {
        const validators = `lte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
