import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export interface TextareaFieldExtra {
    placeholderText: string;
    rows: number;
}

export type TextareaFieldDto = FunnelFieldDefinitionModelDto<
    string,
    TextareaFieldExtra
>;

export class TextareaField extends FunnelFieldDefinitionModel<string, TextareaFieldExtra> {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];
    override fieldValueType = "string";

    constructor(dto: FunnelFieldDefinitionModelDto<string, TextareaFieldExtra>) {
        super({
            ...dto,
            type: "textarea",
            extra: dto.extra || { placeholderText: "", rows: 4 }
        });
    }
}
