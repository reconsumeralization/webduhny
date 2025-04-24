import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class UrlValidator extends AbstractValidator {
    type = "url";
    params = {
        errorMessage: "Value must be a valid URL.",
        extra: {}
    };

    validate(value: any) {
        return validation.validateSync(value, "url", { throw: false }) === true;
    }
}
