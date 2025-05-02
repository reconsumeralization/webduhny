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
        return value.exists();
    }
}
