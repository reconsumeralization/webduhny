import { FunnelFieldDefinitionModel, FunnelFieldDefinitionModelDto } from "../FunnelFieldDefinitionModel";

export class TextField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"]
    override fieldValueType = "string";


    constructor(dto: FunnelFieldDefinitionModelDto) {
        super({
            ...dto,
            type: "text",
            extra: { placeholderText: "" }
        });
    }
}
