import { FunnelFieldDefinitionModel } from "../FunnelFieldDefinitionModel";

export class RadioField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required"];
    override supportedFieldValueTypes = ["string"];
}
