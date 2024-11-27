import React from "react";
import { makeDecoratable } from "~/utils";
import { TextareaPrimitive, TextareaPrimitiveProps } from "./TextareaPrimitive";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type TextareaProps = FormComponentProps & TextareaPrimitiveProps;

const DecoratableTextarea = ({
    label,
    description,
    note,
    validation,
    validate,
    required,
    ...props
}: TextareaProps) => {
    return (
        <FormComponent
            label={label}
            description={description}
            note={note}
            validation={validation}
            validate={validate}
            required={required}
        >
            <TextareaPrimitive {...props} />
        </FormComponent>
    );
};
const Textarea = makeDecoratable("Textarea", DecoratableTextarea);

export { Textarea, type TextareaProps };
