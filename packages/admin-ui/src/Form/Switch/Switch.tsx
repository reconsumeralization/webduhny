import React from "react";
import { makeDecoratable } from "~/utils";
import { Switch as SwitchRenderer, SwitchProps as SwitchRendererProps } from "~/Switch";
import { FormComponent, FormComponentProps } from "../FormComponent";

type SwitchProps = SwitchRendererProps & FormComponentProps;

const DecoratableFormSwitch = ({
    description,
    note,
    validation,
    validate,
    ...props
}: SwitchProps) => {
    return (
        <FormComponent
            description={description}
            note={note}
            validation={validation}
            validate={validate}
        >
            <SwitchRenderer {...props} />
        </FormComponent>
    );
};

const Switch = makeDecoratable("Switch", DecoratableFormSwitch);

export { Switch };
