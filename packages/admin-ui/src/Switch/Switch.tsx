import React from "react";
import { makeDecoratable } from "~/utils";
import { SwitchPrimitive } from "~/Switch";
import { FormComponent, FormComponentProps } from "~/FormComponent";

const DecoratableSwitch = (props: FormComponentProps<typeof SwitchPrimitive>) => {
    return (
        <FormComponent
            description={props.description}
            note={props.note}
            validation={props.validation}
            validate={props.validate}
            required={props.required}
            disabled={props.disabled}
            element={<SwitchPrimitive {...props} label={props.label} />}
        />
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch };
