import { AbstractValidator, FieldValidatorDto } from "./validators/AbstractValidator";
import { validatorFromDto } from "./validators/validatorFactory";

export interface FunnelFieldDefinitionModelDto<TExtra = any> {
    id: string;
    fieldId: string;
    stepId: string;
    type: string;
    label: string;
    helpText: string;
    validators: FieldValidatorDto[];
    extra: TExtra;
}

export class FunnelFieldDefinitionModel {
    id: string;
    type: string;
    stepId: string;
    fieldId: string;
    label: string;
    helpText: string;
    defaultValue: any;
    validators: AbstractValidator[];
    extra: any; // todo

    // Meta fields.
    supportedValidatorTypes: string[] = ["required", "minLength", "maxLength", "gte", "lte"];

    constructor(dto: FunnelFieldDefinitionModelDto) {
        this.id = dto.id;
        this.fieldId = dto.fieldId;
        this.stepId = dto.stepId;
        this.type = dto.type;
        this.label = dto.label;
        this.helpText = dto.helpText;
        this.validators = dto.validators?.map(validatorFromDto) ?? [];
        this.extra = dto.extra ?? {};
    }

    getSupportedValidatorTypes(): string[] {
        return this.supportedValidatorTypes;
    }

    toDto(): FunnelFieldDefinitionModelDto {
        return {
            id: this.id,
            fieldId: this.fieldId,
            stepId: this.stepId,
            type: this.type,
            label: this.label,
            helpText: this.helpText,
            validators: this.validators.map(v => v.toDto()),
            extra: this.extra
        };
    }

    populate(dto: Partial<FunnelFieldDefinitionModelDto>) {
        this.fieldId = dto.fieldId || this.fieldId;
        this.stepId = dto.stepId || this.stepId;
        this.type = dto.type || this.type;
        this.label = dto.label || this.label;
        this.helpText = dto.helpText || this.helpText;
        this.validators = dto.validators?.map(validatorFromDto) ?? this.validators;

        console.log('populirao, vals:', this.validators)
        this.extra = dto.extra ?? this.extra;
    }

    static fromDto(dto: FunnelFieldDefinitionModelDto): FunnelFieldDefinitionModel {
        return new FunnelFieldDefinitionModel(dto);
    }

    clone() {
        return new FunnelFieldDefinitionModel(this.toDto());
    }
}
