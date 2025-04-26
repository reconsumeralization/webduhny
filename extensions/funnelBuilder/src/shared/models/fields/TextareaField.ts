import { FunnelFieldDefinitionModel } from "../FunnelFieldDefinitionModel";

export class TextareaField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];
}