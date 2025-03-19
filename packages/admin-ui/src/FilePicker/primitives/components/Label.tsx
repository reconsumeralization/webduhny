import * as React from "react";
import { FormComponentLabel, type FormComponentProps } from "~/FormComponent";

type FormPickerLabelProps = Pick<
    FormComponentProps,
    "label" | "description" | "disabled" | "required"
> & {
    className?: string;
};

const FormPickerLabel = ({
    label,
    description,
    required,
    disabled,
    className
}: FormPickerLabelProps) => {
    return (
        <FormComponentLabel
            text={label}
            required={required}
            disabled={disabled}
            hint={description}
            className={className}
        />
    );
};

export { FormPickerLabel, type FormPickerLabelProps };
