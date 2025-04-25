import { validation } from "@webiny/validation";
import {AbstractValidator, FieldValidatorParamsDto} from "./AbstractValidator";

export class UrlValidator extends AbstractValidator {
    constructor(params: FieldValidatorParamsDto = {}) {
        super({
            type: "url",
            params: {
                errorMessage: params.errorMessage || "Value must be a valid URL.",
                extra: {}
            }
        });
    }

    validate(value: any) {
        const validators = `url`;
        return validation.validateSync(value, validators, { throw: false }) === true;
    }
}
