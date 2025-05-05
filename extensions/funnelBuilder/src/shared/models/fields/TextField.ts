import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export interface TextFieldExtra {
    placeholderText: string;
}

export type TextFieldDto = FunnelFieldDefinitionModelDto<string, TextFieldExtra>;

export class TextField extends FunnelFieldDefinitionModel<string, TextFieldExtra> {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];

    constructor(dto: FunnelFieldDefinitionModelDto<string, TextFieldExtra>) {
        super({
            ...dto,
            value: { type: "string", array: false, value: dto?.value?.value || "" },
            type: "text",
            extra: dto.extra || { placeholderText: "" }
        });
    }
}
