import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { AutoCompletePrimitive, AutoCompletePrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type AutoCompleteProps = AutoCompletePrimitiveProps & FormComponentProps;

const DecoratableAutoComplete = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: AutoCompleteProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} disabled={disabled} />
            <AutoCompletePrimitive {...props} disabled={disabled} label={label} invalid={invalid} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};

const AutoComplete = makeDecoratable("AutoComplete", DecoratableAutoComplete);

export { AutoComplete };
