import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

interface MinLengthValidatorExtraParams {
    threshold?: number;
}

export class MinLengthValidator extends AbstractValidator<MinLengthValidatorExtraParams> {
    constructor(params: FieldValidatorParamsDto<MinLengthValidatorExtraParams> = {}) {
        super({
            type: "minLength",
            params: {
                errorMessage: params.errorMessage || "Value is too short.",
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

        const validators = `minLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
