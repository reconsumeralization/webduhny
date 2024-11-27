import React from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxPrimitive, CheckboxPrimitiveProps } from "~/Checkbox";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type CheckboxProps = FormComponentProps & CheckboxPrimitiveProps;

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
            <CheckboxPrimitive {...props} />
        </FormComponent>
    );
};
const Checkbox = makeDecoratable("Checkbox", DecoratableFormCheckbox);

export { Checkbox, type CheckboxProps };
