import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

interface GteValidatorExtraParams {
    threshold?: number;
}

export class GteValidator extends AbstractValidator<GteValidatorExtraParams> {
    constructor(params: FieldValidatorParamsDto<GteValidatorExtraParams> = {}) {
        super({
            type: "gte",
            params: {
                errorMessage: params.errorMessage || "Value is too small.",
                extra: {
                    threshold: params.extra?.threshold
                }
            }
        });
    }

    isValid(value: any) {
        if (!this.params.extra?.threshold) {
            return true;
        }

        const validators = `gte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
