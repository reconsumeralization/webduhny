import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxPrimitive, CheckboxPrimitiveProps } from "./primitives/";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type CheckboxProps = CheckboxPrimitiveProps & FormComponentProps;

const DecoratableCheckbox = ({ description, note, validation, ...props }: CheckboxProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentDescription text={description} disabled={props.disabled} />
            <CheckboxPrimitive {...props} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={props.disabled}
            />
            <FormComponentNote text={note} disabled={props.disabled} />
        </div>
    );
};
const Checkbox = makeDecoratable("Checkbox", DecoratableCheckbox);

export { Checkbox };
