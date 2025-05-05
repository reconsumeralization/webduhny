import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export interface NumberFieldExtra {
    placeholderText: string;
}

export type NumberFieldDto = FunnelFieldDefinitionModelDto<number, NumberFieldExtra>;

export class NumberField extends FunnelFieldDefinitionModel<number> {
    override supportedValidatorTypes = ["required", "gte", "lte"];

    constructor(dto: FunnelFieldDefinitionModelDto<number, NumberFieldExtra>) {
        super({
            ...dto,
            value: { type: "number", array: false, value: dto?.value?.value || 0 },
            type: "number",
            extra: dto.extra || { placeholderText: "" }
        });
    }
}
