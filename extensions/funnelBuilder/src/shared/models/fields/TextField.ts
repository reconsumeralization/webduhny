import { FunnelFieldDefinitionModel } from "../FunnelFieldDefinitionModel";

export class TextField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required", "minLength", "maxLength", "pattern"];
}
