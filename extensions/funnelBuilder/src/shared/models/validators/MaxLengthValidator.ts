import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

interface MaxLengthValidatorExtraParams {
    threshold?: number;
}

export class MaxLengthValidator extends AbstractValidator<MaxLengthValidatorExtraParams> {
    constructor(params: FieldValidatorParamsDto<MaxLengthValidatorExtraParams> = {}) {
        super({
            type: "maxLength",
            params: {
                errorMessage: params.errorMessage || "Value is too long.",
                extra: {
                    threshold: params.extra?.threshold
                }
            }
        });
    }

    validate(value: any) {
        if (!this.params.extra?.threshold) {
            return true;
        }

        const validators = `maxLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
