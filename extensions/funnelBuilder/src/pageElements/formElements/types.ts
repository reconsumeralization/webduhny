export interface FormElementElementData<TExtra = {}> {
    field: {
        fieldId: string;
        validators: any[];
        label: string;
        helpText: string;
        extra: TExtra
    }
}