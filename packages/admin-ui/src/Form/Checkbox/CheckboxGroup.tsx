import React from "react";
import { makeDecoratable } from "~/utils";
import {
    CheckboxGroup as CheckboxGroupRenderer,
    CheckboxGroupProps as CheckboxGroupRendererProps
} from "~/Checkbox";
import { FormComponent, FormComponentProps } from "../FormComponent";

type CheckboxGroupProps = FormComponentProps & CheckboxGroupRendererProps;

const DecoratableFormCheckboxGroup = ({
    label,
    description,
    note,
    validation,
    validate,
    ...props
}: CheckboxGroupProps) => {
    return (
        <FormComponent
            label={label}
            description={description}
            note={note}
            validation={validation}
            validate={validate}
        >
            <CheckboxGroupRenderer {...props} />
        </FormComponent>
    );
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableFormCheckboxGroup);

export { CheckboxGroup };
