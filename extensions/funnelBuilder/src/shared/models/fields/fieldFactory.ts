import { TextField } from "./TextField";
import { TextareaField } from "./TextareaField";
import {
    type FunnelFieldDefinitionModel,
    type FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { NumberField } from "./NumberField";
import { RadioField } from "./RadioField";

const registry: Record<string, (dto: FunnelFieldDefinitionModelDto) => FunnelFieldDefinitionModel> =
    {
        checkboxGroup: dto => new CheckboxGroupField(dto), // Placeholder, replace with actual CheckboxField class
        number: dto => new NumberField(dto),
        radio: dto => new RadioField(dto),
        textarea: dto => new TextareaField(dto),
        text: dto => new TextField(dto),
    };

export function fieldFromDto(dto: FunnelFieldDefinitionModelDto): FunnelFieldDefinitionModel {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field type: ${dto.type}`);
    }
    return create(dto);
}
