import React from "react";
import { makeDecoratable } from "~/utils";
import { Checkbox as CheckboxRenderer, CheckboxProps as CheckboxRendererProps } from "~/Checkbox";
import { FormComponent, FormComponentProps } from "../FormComponent";

type CheckboxProps = FormComponentProps & CheckboxRendererProps;

const DecoratableFormCheckbox = ({
    description,
    note,
    validation,
    validate,
    ...props
}: CheckboxProps) => {
    return (
        <FormComponent
            description={description}
            note={note}
            validation={validation}
            validate={validate}
        >
            <CheckboxRenderer {...props} />
        </FormComponent>
    );
};
const Checkbox = makeDecoratable("Checkbox", DecoratableFormCheckbox);

export { Checkbox, type CheckboxProps };
