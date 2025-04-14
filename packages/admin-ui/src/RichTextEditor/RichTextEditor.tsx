import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { RichTextEditorPrimitive, RichTextEditorPrimitiveProps } from "./RichTextEditorPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type RichTextEditorProps = RichTextEditorPrimitiveProps & FormComponentProps;

const DecoratableRichTextEditor = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: RichTextEditorProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} disabled={disabled} />
            <RichTextEditorPrimitive {...props} disabled={disabled} invalid={invalid} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const RichTextEditor = makeDecoratable("RichTextEditor", DecoratableRichTextEditor);

export { RichTextEditor, type RichTextEditorProps };
