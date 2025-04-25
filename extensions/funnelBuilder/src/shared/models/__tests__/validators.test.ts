import { validatorFromDto } from "../validators/validatorFactory";
import { MinLengthValidator } from "../validators/MinLengthValidator";
import { RequiredValidator } from "../validators/RequiredValidator";

describe("Validator From DTO", () => {
    test("ensure validator is correctly instantiated with no params", async () => {
        const validator = validatorFromDto({
            type: "required",
            params: {}
        });

        expect(validator).toBeInstanceOf(RequiredValidator);
        expect(validator.type).toBe("required");
        expect(validator.params.errorMessage).toBe(
            "Value is required."
        );
        expect(validator.params.extra).toEqual({});
    });

    test("ensure validator is correctly instantiated with provided params", async () => {
        const validator = validatorFromDto({
            type: "minLength",
            params: {
                extra: {
                    threshold: 2
                },
                errorMessage: "This field must be at least 2 characters long."
            }
        });

        expect(validator).toBeInstanceOf(MinLengthValidator);
        expect(validator.type).toBe("minLength");
        expect(validator.params.errorMessage).toBe(
            "This field must be at least 2 characters long."
        );
        expect(validator.params.extra?.threshold).toBe(2);
    });
});
