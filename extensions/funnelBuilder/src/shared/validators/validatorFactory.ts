import { RequiredValidator } from "./RequiredValidator";
import { GteValidator } from "./GteValidator";
import { AbstractValidator } from "./AbstractValidator";
import { EmailValidator } from "./EmailValidator";
import { LteValidator } from "./LteValidator";
import { MaxLengthValidator } from "./MaxLengthValidator";
import { MinLengthValidator } from "./MinLengthValidator";

export interface FieldValidatorDto {
    type: string;
    params?: any; // Additional parameters for the validator.
}

const registry: Record<string, (dto: FieldValidatorDto) => AbstractValidator> = {
    email: () => new EmailValidator(),
    gte: dto => new GteValidator(dto.params),
    lte: dto => new LteValidator(dto.params),
    maxLength: dto => new MaxLengthValidator(dto.params),
    minLength: dto => new MinLengthValidator(dto.params),
    required: () => new RequiredValidator()
};

export function validatorFromDto(dto: FieldValidatorDto): AbstractValidator {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown validator type: ${dto.type}`);
    }
    return create(dto);
}
