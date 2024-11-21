export interface CheckboxItemDto<TValue = any> {
    id?: string;
    label: string | React.ReactNode;
    value?: TValue;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}
