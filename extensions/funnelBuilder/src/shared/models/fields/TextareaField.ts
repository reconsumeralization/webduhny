import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export class TextareaField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];
    override fieldValueType = "string";

    constructor(dto: FunnelFieldDefinitionModelDto) {
        super({
            ...dto,
            type: "textarea",
            extra: { placeholderText: "", rows: 4 }
        });
    }
}
