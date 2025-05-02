import { FunnelFieldDefinitionModel } from "../FunnelFieldDefinitionModel";

export class NumberField extends FunnelFieldDefinitionModel {
    override supportedValidatorTypes = ["required", "gte", "lte"];
    override supportedFieldValueTypes = ["number"];
}
