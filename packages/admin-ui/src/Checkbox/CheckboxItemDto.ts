export interface CheckboxItemDto {
    id?: string;
    label: string | React.ReactNode;
    checked: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}
