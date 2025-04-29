import { RequiredValidator } from "./RequiredValidator";
import { GteValidator } from "./GteValidator";
import { AbstractValidator, FieldValidatorDto } from "./AbstractValidator";
import { LteValidator } from "./LteValidator";
import { MaxLengthValidator } from "./MaxLengthValidator";
import { MinLengthValidator } from "./MinLengthValidator";
import { PatternValidator } from "./PatternValidator";

const registry: Record<string, (dto: FieldValidatorDto) => AbstractValidator> = {
    gte: dto => new GteValidator(dto.params),
    lte: dto => new LteValidator(dto.params),
    maxLength: dto => new MaxLengthValidator(dto.params),
    minLength: dto => new MinLengthValidator(dto.params),
    pattern: dto => new PatternValidator(dto.params),
    required: dto => new RequiredValidator(dto.params)
};

export function validatorFromDto(dto: FieldValidatorDto): AbstractValidator {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown validator type: ${dto.type}`);
    }
    return create(dto);
}
