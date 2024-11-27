import React from "react";
import { makeDecoratable } from "~/utils";
import { SwitchPrimitive, SwitchPrimitiveProps } from "~/Switch";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type SwitchProps = SwitchPrimitiveProps & FormComponentProps;

const DecoratableSwitch = ({
    description,
    note,
    validation,
    validate,
    required,
    ...props
}: SwitchProps) => {
    return (
        <FormComponent
            description={description}
            note={note}
            validation={validation}
            validate={validate}
            required={required}
        >
            <SwitchPrimitive {...props} />
        </FormComponent>
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch };
