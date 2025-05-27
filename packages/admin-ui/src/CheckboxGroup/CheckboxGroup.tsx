import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import {
    CheckboxGroupPrimitive,
    CheckboxGroupPrimitiveProps
} from "./primitives/CheckboxGroupPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type CheckboxGroupProps = CheckboxGroupPrimitiveProps & FormComponentProps;

const DecoratableCheckboxGroup = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: CheckboxGroupProps) => {
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
            <CheckboxGroupPrimitive {...props} />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableCheckboxGroup);

export { CheckboxGroup };
