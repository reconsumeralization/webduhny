import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export interface TextFieldExtra {
    placeholderText: string;
}

export type TextFieldDto = FunnelFieldDefinitionModelDto<
    string,
    TextFieldExtra
>;


export class TextField extends FunnelFieldDefinitionModel<string, TextFieldExtra> {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];
    override fieldValueType = "string";

    constructor(dto: FunnelFieldDefinitionModelDto<string, TextFieldExtra>) {
        super({
            ...dto,
            type: "text",
            extra: dto.extra || { placeholderText: "" }
        });
    }
}
