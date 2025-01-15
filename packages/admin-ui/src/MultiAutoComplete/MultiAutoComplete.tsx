import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { MultiAutoCompletePrimitive, MultiAutoCompletePrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type MultiAutoCompleteProps = MultiAutoCompletePrimitiveProps & FormComponentProps;

const DecoratableMultiAutoComplete = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: MultiAutoCompleteProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <MultiAutoCompletePrimitive {...props} disabled={disabled} label={label} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const MultiAutoComplete = makeDecoratable("MultiAutoComplete", DecoratableMultiAutoComplete);

export { MultiAutoComplete };
