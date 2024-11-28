import React from "react";
import { makeDecoratable } from "~/utils";
import { TextareaPrimitive } from "./TextareaPrimitive";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableTextarea = (props: FormComponentProps<typeof TextareaPrimitive>) => {
    return (
        <FormComponent
            label={props.label}
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<TextareaPrimitive {...props} />}
        />
    );
};
const Textarea = makeDecoratable("Textarea", DecoratableTextarea);

export { Textarea };
