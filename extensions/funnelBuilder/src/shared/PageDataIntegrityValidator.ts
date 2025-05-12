import { PbPage } from "./types";
import { registry } from "./PageDataIntegrityValidators/registry";

export type PageDataIntegrityValidatorError = {
    isValid: false;
    errorMessage: string;
    data: any;
};

export type PageDataIntegrityValidatorSuccess = {
    isValid: true;
    errorMessage: null;
    data: null;
};

export type PageDataIntegrityValidatorResult =
    | PageDataIntegrityValidatorError
    | PageDataIntegrityValidatorSuccess;

export class PageDataIntegrityValidator {
    static validate(page: PbPage): PageDataIntegrityValidatorResult {
        const errors = registry
            .map(ValidatorClass => {
                try {
                    ValidatorClass.validate(page);
                    return undefined;
                } catch (error) {
                    return error;
                }
            })
            .filter(Boolean);

        if (errors.length > 0) {
            return {
                isValid: false,
                errorMessage: "Page data integrity validation failed.",
                data: {
                    errors: errors.map((error: Error) => {
                        return {
                            message: error.message,
                            cause: error.cause,
                        };
                    })
                }
            };
        }

        return {
            isValid: true,
            errorMessage: null,
            data: null
        };
    }

    static ensureValid(page: PbPage) {
        const error = this.validate(page);
        if (error) {
            throw error;
        }
    }
}
