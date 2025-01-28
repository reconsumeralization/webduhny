import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { CodeEditorPrimitive, CodeEditorPrimitiveProps } from "./CodeEditorPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type CodeEditorProps = CodeEditorPrimitiveProps & FormComponentProps;

const DecoratableCodeEditor = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: CodeEditorProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <CodeEditorPrimitive {...props} disabled={disabled} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const CodeEditor = makeDecoratable("CodeEditor", DecoratableCodeEditor);

export { CodeEditor, type CodeEditorProps };
