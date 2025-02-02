import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { IconPickerPrimitive, IconPickerPrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type IconPickerProps = IconPickerPrimitiveProps & FormComponentProps;

const DecoratableIconPicker = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: IconPickerProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <IconPickerPrimitive {...props} disabled={disabled} invalid={invalid} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const IconPicker = makeDecoratable("IconPicker", DecoratableIconPicker);

export { IconPicker, type IconPickerProps };
