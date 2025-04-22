import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class EmailValidator extends AbstractValidator {
    type = "email";

    validate(value: any) {
        return validation.validateSync(value, "email", { throw: false }) === true;
    }

    getErrorMessage() {
        return "Value must be a valid email address.";
    }

    toDto() {
        return { type: this.type };
    }
}
