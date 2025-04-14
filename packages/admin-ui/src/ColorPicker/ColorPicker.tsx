import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { ColorPickerPrimitive, ColorPickerPrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type ColorPickerProps = ColorPickerPrimitiveProps & FormComponentProps;

const DecoratableIconPicker = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: ColorPickerProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} disabled={disabled} />
            <ColorPickerPrimitive {...props} disabled={disabled} invalid={invalid} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const ColorPicker = makeDecoratable("ColorPicker", DecoratableIconPicker);

export { ColorPicker, type ColorPickerProps };
