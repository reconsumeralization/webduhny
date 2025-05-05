import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export interface CheckboxGroupFieldExtra {
    options: Array<{ value: string; label: string }>;
}

export type CheckboxGroupFieldDto = FunnelFieldDefinitionModelDto<string[], CheckboxGroupFieldExtra>;

export class CheckboxGroupField extends FunnelFieldDefinitionModel<
    string[],
    CheckboxGroupFieldExtra
> {
    override supportedValidatorTypes = ["required"];

    constructor(dto: FunnelFieldDefinitionModelDto<string[], CheckboxGroupFieldExtra>) {
        super({
            ...dto,
            value: { type: "stringArray", array: true, value: dto?.value?.value || [] },
            type: "checkboxGroup",
            extra: dto.extra || { options: [] }
        });
    }
}
