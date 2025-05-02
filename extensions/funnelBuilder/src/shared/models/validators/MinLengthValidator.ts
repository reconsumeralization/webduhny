import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

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

    isValid(value: FunnelFieldValueModel) {
        if (value.isEmpty()) {
            return true;
        }

        if (!this.params.extra?.threshold) {
            return true;
        }

        if (value.array) {
            return Array.isArray(value.value) && value.value.length >= this.params.extra?.threshold;
        }

        const validators = `minLength:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
