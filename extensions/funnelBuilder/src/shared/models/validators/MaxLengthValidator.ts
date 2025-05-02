import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

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

    isValid(value: FunnelFieldValueModel) {
        if (value.isEmpty()) {
            return true;
        }

        if (!this.params.extra?.threshold) {
            return true;
        }

        if (value.array) {
            return Array.isArray(value.value) && value.value.length <= this.params.extra?.threshold;
        }

        const validators = `maxLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
