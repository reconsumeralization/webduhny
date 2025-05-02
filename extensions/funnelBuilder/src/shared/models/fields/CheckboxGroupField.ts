import { FunnelFieldDefinitionModel, FunnelFieldDefinitionModelDto } from "../FunnelFieldDefinitionModel";

export interface CheckboxGroupFieldExtra {
    options: { value: string, label: string}
}

export type FunnelCheckboxGroupFieldDefinitionModelDto = FunnelFieldDefinitionModelDto<string, CheckboxGroupFieldExtra>

export class CheckboxGroupField extends FunnelFieldDefinitionModel<string, CheckboxGroupFieldExtra> {
    override supportedValidatorTypes = ["required"];
    override fieldValueType = "stringArray";
}
