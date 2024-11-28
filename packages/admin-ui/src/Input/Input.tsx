import React from "react";
import { makeDecoratable } from "~/utils";
import { InputPrimitive } from "./InputPrimitive";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableInput = (props: FormComponentProps<typeof InputPrimitive>) => {
    return (
        <FormComponent
            label={props.label}
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<InputPrimitive {...props} />}
        />
    );
};
const Input = makeDecoratable("Input", DecoratableInput);

export { Input };
