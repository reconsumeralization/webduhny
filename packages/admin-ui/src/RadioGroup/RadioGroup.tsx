import React from "react";
import { makeDecoratable } from "~/utils";
import { RadioGroupPrimitive } from "~/RadioGroup";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableRadioGroup = (props: FormComponentProps<typeof RadioGroupPrimitive>) => {
    return (
        <FormComponent
            label={props.label}
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<RadioGroupPrimitive {...props} />}
        />
    );
};
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export { RadioGroup };
