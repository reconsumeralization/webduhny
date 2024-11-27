import React from "react";
import { makeDecoratable } from "~/utils";
import { Input as InputRenderer, InputProps as InputRendererProps } from "~/Input";
import { FormComponent, FormComponentProps } from "../FormComponent";

type InputProps = FormComponentProps & InputRendererProps;

const DecoratableFormInput = ({
    label,
    description,
    note,
    validation,
    validate,
    ...props
}: InputProps) => {
    return (
        <FormComponent
            label={label}
            description={description}
            note={note}
            validation={validation}
            validate={validate}
        >
            <InputRenderer {...props} />
        </FormComponent>
    );
};
const Input = makeDecoratable("Input", DecoratableFormInput);

export { Input };
