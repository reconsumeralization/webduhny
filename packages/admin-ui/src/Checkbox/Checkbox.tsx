import React from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxPrimitive } from "~/Checkbox";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableCheckbox = (props: FormComponentProps<typeof CheckboxPrimitive>) => {
    return (
        <FormComponent
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<CheckboxPrimitive {...props} label={props.label} />}
        />
    );
};
const Checkbox = makeDecoratable("Checkbox", DecoratableCheckbox);

export { Checkbox };
