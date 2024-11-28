import React from "react";
import { makeDecoratable } from "~/utils";
import { RadioGroupPrimitive, RadioGroupPrimitiveProps } from "~/RadioGroup";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type RadioGroupProps = FormComponentProps & RadioGroupPrimitiveProps;

const DecoratableRadioGroup = ({
    label,
    description,
    note,
    validation,
    validate,
    required,
    disabled,
    ...props
}: RadioGroupProps) => {
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
            <RadioGroupPrimitive {...props} />
        </FormComponent>
    );
};
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export { RadioGroup };
