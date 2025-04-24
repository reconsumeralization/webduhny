import { validation } from "@webiny/validation";
import { AbstractValidator } from "./AbstractValidator";

export class RequiredValidator extends AbstractValidator {
    type = "required";
    params = {
        errorMessage: "Value is required.",
        extra: {}
    };

    validate(value: any) {
        return validation.validateSync(value, "required", { throw: false }) === true;
    }
}
