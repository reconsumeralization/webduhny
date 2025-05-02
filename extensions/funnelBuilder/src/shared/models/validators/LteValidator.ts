import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

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

    isValid(value: FunnelFieldValueModel) {
        if (value.isEmpty()) {
            return true;
        }

        if (!this.params.extra?.threshold) {
            return true;
        }

        if (value.array) {
            // This validator can't be applied on array values.
            return true;
        }

        const validators = `lte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
