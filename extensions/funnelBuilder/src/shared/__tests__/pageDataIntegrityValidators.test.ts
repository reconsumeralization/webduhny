import { PageDataIntegrityValidator } from "../PageDataIntegrityValidator";
import { noOrphanFieldElementsValidatorMock } from "./mocks/pageDataIntegrityValidation/noOrphanFieldElementsValidatorMock";
import { noOrphanContainerFieldsMock } from "./mocks/pageDataIntegrityValidation/noOrphanContainerFieldsMock";
import { containerElementExistsMock } from "./mocks/pageDataIntegrityValidation/containerElementExistsMock";

describe("Page Data Integrity Validators", () => {
    test("NoOrphanContainerFieldsValidator", async () => {
        const result = PageDataIntegrityValidator.validate(noOrphanContainerFieldsMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        cause: ["orphanField-123abc"],
                        message: "Orphan fields found."
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });

    test("NoOrphanFieldElementsValidator", async () => {
        const result = PageDataIntegrityValidator.validate(noOrphanFieldElementsValidatorMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        cause: ["jhos45r"],
                        message: "Orphan fields found."
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });

    test("ContainerElementExists", async () => {
        const result = PageDataIntegrityValidator.validate(containerElementExistsMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        message: "Container element not found."
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });
});
