import React from "react";
import { makeDecoratable } from "~/utils";
import { SelectPrimitive } from "~/Select";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableSelect = (props: FormComponentProps<typeof SelectPrimitive>) => {
    return (
        <FormComponent
            label={props.label}
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<SelectPrimitive {...props} />}
        />
    );
};
const Select = makeDecoratable("Select", DecoratableSelect);

export { Select };
