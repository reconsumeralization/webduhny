import React from "react";
import { makeDecoratable } from "~/utils";
import { Select as SelectRenderer, SelectProps as SelectRendererProps } from "~/Select";
import { FormComponent, FormComponentProps } from "../FormComponent";

type InputProps = FormComponentProps & SelectRendererProps;

const DecoratableFormSelect = ({
    label,
    description,
    note,
    validation,
    validate,
    ...props
}: InputProps) => {
    return (
        <FormComponent
            label={label}
            description={description}
            note={note}
            validation={validation}
            validate={validate}
        >
            <SelectRenderer {...props} />
        </FormComponent>
    );
};
const Select = makeDecoratable("Select", DecoratableFormSelect);

export { Select };
