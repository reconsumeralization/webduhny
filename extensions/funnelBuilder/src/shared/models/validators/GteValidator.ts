import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

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

        const validators = `gte:${this.params.extra.threshold}`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
