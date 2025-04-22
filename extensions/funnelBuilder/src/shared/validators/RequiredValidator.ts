import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class RequiredValidator extends AbstractValidator {
    type = "required";

    validate(value: any) {
        return validation.validateSync(value, "required", { throw: false }) === true;
    }

    getErrorMessage() {
        return `Value is required.`;
    }

    toDto() {
        return { type: this.type };
    }
}
