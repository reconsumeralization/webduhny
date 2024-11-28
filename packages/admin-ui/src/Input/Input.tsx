import React from "react";
import { makeDecoratable } from "~/utils";
import { InputPrimitive, InputPrimitiveProps } from "./InputPrimitive";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type InputProps = FormComponentProps & InputPrimitiveProps;

const DecoratableInput = ({
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
            <InputPrimitive {...props} />
        </FormComponent>
    );
};
const Input = makeDecoratable("Input", DecoratableInput);

export { Input };
