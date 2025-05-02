import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class RequiredValidator extends AbstractValidator {
    constructor(params: FieldValidatorParamsDto = {}) {
        super({
            type: "required",
            params: {
                errorMessage: params.errorMessage || "Value is required.",
                extra: {}
            }
        });
    }

    isValid(value: FunnelFieldValueModel) {
        const validators = `required`;
        if (value.array) {
            return Array.isArray(value.value) && value.value.length > 0;
        }

        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
