import React from "react";
import { makeDecoratable } from "~/utils";
import { SelectPrimitive, SelectPrimitiveProps } from "~/Select";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type InputProps = FormComponentProps & SelectPrimitiveProps;

const DecoratableFormSelect = ({
    label,
    description,
    note,
    validation,
    validate,
    required,
    disabled,
    ...props
}: InputProps) => {
    return (
        <FormComponent
            label={label}
            description={description}
            note={note}
            validation={validation}
            validate={validate}
            required={required}
            disabled={disabled}
        >
            <SelectPrimitive {...props} />
        </FormComponent>
    );
};
const Select = makeDecoratable("Select", DecoratableFormSelect);

export { Select };
