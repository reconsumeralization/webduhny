import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../FunnelFieldDefinitionModel";

export type NumberFieldDto = FunnelFieldDefinitionModelDto<number>;

export class NumberField extends FunnelFieldDefinitionModel<number> {
    override supportedValidatorTypes = ["required", "gte", "lte"];
    override fieldValueType = "number";
}
