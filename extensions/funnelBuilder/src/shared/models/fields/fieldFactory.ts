import { TextField, TextFieldDto } from "./TextField";
import { TextareaField, TextareaFieldDto } from "./TextareaField";
import {
    type FunnelFieldDefinitionModel,
    type FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";
import { CheckboxGroupField, CheckboxGroupFieldDto } from "./CheckboxGroupField";
import { NumberField, NumberFieldDto } from "./NumberField";

const registry = {
    checkboxGroup: (dto: CheckboxGroupFieldDto) => {
        return new CheckboxGroupField(dto);
    },
    number: (dto: NumberFieldDto) => new NumberField(dto),
    textarea: (dto: TextareaFieldDto) => new TextareaField(dto),
    text: (dto: TextFieldDto) => new TextField(dto)
};

export function fieldFromDto(dto: FunnelFieldDefinitionModelDto): FunnelFieldDefinitionModel {
    // @ts-ignore
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field type: ${dto.type}`);
    }
    return create(dto);
}
