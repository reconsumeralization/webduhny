export interface FieldElementData<TExtra = {}> {
    field: {
        id: string;
        fieldId: string;
        type: string;
        label: string;
        helpText: string;
        validators: Array<any> // todo
        extra: TExtra;
    }
}