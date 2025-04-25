import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

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

    isValid(value: any) {
        const validators = `required`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
