import { FunnelFieldDefinitionModel } from "../FunnelFieldDefinitionModel";

export interface CheckboxGroupFieldExtra {
    options: { value: string, label: string}
}

export class CheckboxGroupField extends FunnelFieldDefinitionModel<string, CheckboxGroupFieldExtra> {
    override supportedValidatorTypes = ["required"];
    override supportedFieldValueTypes = ["stringArray"];
}
