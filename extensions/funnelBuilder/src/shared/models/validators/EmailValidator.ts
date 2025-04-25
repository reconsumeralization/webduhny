import { validation } from "@webiny/validation";
import { AbstractValidator, FieldValidatorParamsDto } from "./AbstractValidator";

export class EmailValidator extends AbstractValidator {
    constructor(params: FieldValidatorParamsDto = {}) {
        super({
            type: "email",
            params: {
                errorMessage: params.errorMessage || "Value must be a valid email address.",
                extra: {}
            }
        });
    }

    validate(value: any) {
        const validators = `email`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
