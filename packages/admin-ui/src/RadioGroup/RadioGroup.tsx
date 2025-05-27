import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { RadioGroupPrimitive, RadioGroupPrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type RadioGroupProps = RadioGroupPrimitiveProps & FormComponentProps;

const DecoratableRadioGroup = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: RadioGroupProps) => {
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
            <FormComponentDescription
                text={description}
                disabled={disabled}
                className={"wby-mb-xs-plus"}
            />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
                className={"wby-mt-none wby-mb-xs-plus"}
            />
            <RadioGroupPrimitive {...props} />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export { RadioGroup };
