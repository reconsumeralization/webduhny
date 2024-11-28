import React from "react";
import { makeDecoratable } from "~/utils";
import { SwitchPrimitive, SwitchPrimitiveProps } from "~/Switch";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type SwitchProps = SwitchPrimitiveProps & FormComponentProps;

const DecoratableSwitch = ({
    description,
    disabled,
    note,
    required,
    validate,
    validation,
    ...props
}: SwitchProps) => {
    return (
        <FormComponent
            description={description}
            note={note}
            validation={validation}
            validate={validate}
            required={required}
            disabled={disabled}
        >
            <SwitchPrimitive {...props} disabled={disabled} required={required} />
        </FormComponent>
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch };
