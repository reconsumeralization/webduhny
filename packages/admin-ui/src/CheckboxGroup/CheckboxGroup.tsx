import React from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxGroupPrimitive, CheckboxGroupPrimitiveProps } from "~/CheckboxGroup";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type CheckboxGroupProps = FormComponentProps & CheckboxGroupPrimitiveProps;

const DecoratableFormCheckboxGroup = ({
    label,
    description,
    note,
    validation,
    validate,
    required,
    disabled,
    ...props
}: CheckboxGroupProps) => {
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
            <CheckboxGroupPrimitive {...props} />
        </FormComponent>
    );
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableFormCheckboxGroup);

export { CheckboxGroup };
