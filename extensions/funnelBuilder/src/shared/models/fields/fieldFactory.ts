import { TextField } from "./TextField";
import { TextareaField } from "./TextareaField";
import {
    type FunnelFieldDefinitionModel,
    type FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

const registry: Record<string, (dto: FunnelFieldDefinitionModelDto) => FunnelFieldDefinitionModel> =
    {
        text: dto => new TextField(dto),
        textarea: dto => new TextareaField(dto)
    };

export function fieldFromDto(dto: FunnelFieldDefinitionModelDto): FunnelFieldDefinitionModel {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field type: ${dto.type}`);
    }
    return create(dto);
}
