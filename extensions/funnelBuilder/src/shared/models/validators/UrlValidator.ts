import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class UrlValidator extends AbstractValidator {
    type = "url";

    validate(value: any) {
        return validation.validateSync(value, "url", { throw: false }) === true;
    }

    getErrorMessage() {
        return "Value must be a valid URL.";
    }

    toDto() {
        return { type: this.type };
    }
}
