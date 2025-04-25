import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

interface LteValidatorExtraParams {
    threshold?: number;
}

export class LteValidator extends AbstractValidator<LteValidatorExtraParams> {
    constructor(params: FieldValidatorParamsDto<LteValidatorExtraParams> = {}) {
        super({
            type: "lte",
            params: {
                errorMessage: params.errorMessage || "Value is too great.",
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

        const validators = `lte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
