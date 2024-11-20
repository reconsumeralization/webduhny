export interface CheckboxItemDto {
    id?: string;
    label: string | React.ReactNode;
    value?: any;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}
