import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

interface GteValidatorExtraParams {
    threshold?: number;
}

export class GteValidator extends AbstractValidator<GteValidatorExtraParams> {
    type = "gte";
    params = {
        errorMessage: "Value is too small.",
        extra: { threshold: undefined }
    };

    validate(value: any) {
        const validators = `gte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
