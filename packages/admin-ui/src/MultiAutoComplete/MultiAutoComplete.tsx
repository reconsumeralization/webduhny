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
        <div className={"wby-w-full"}>
            <FormComponentLabel
                text={label}
                required={required}
                disabled={disabled}
                invalid={invalid}
            />
            <FormComponentDescription text={description} disabled={disabled} />
            <MultiAutoCompletePrimitive
                {...props}
                label={label}
                disabled={disabled}
                invalid={invalid}
            />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};

const MultiAutoComplete = makeDecoratable("MultiAutoComplete", DecoratableMultiAutoComplete);

export { MultiAutoComplete };
