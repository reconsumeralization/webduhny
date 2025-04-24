import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class EmailValidator extends AbstractValidator {
    type = "email";
    params = {
        errorMessage: "Value must be a valid email address.",
        extra: {}
    };

    validate(value: any) {
        return validation.validateSync(value, "email", { throw: false }) === true;
    }
}
