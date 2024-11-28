import React from "react";
import { makeDecoratable } from "~/utils";
import { TextareaPrimitive, TextareaPrimitiveProps } from "./TextareaPrimitive";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type TextareaProps = FormComponentProps & TextareaPrimitiveProps;

const DecoratableTextarea = (props: TextareaProps) => {
    return (
        <FormComponent {...props}>
            <TextareaPrimitive {...props} />
        </FormComponent>
    );
};
const Textarea = makeDecoratable("Textarea", DecoratableTextarea);

export { Textarea, type TextareaProps };
