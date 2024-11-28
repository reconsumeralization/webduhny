import React from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxGroupPrimitive } from "~/CheckboxGroup";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableCheckboxGroup = (props: FormComponentProps<typeof CheckboxGroupPrimitive>) => {
    return (
        <FormComponent
            label={props.label}
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<CheckboxGroupPrimitive {...props} />}
        />
    );
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableCheckboxGroup);

export { CheckboxGroup };
