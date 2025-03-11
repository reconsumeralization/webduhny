import React, { useCallback, useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { FilePrimitive, type FilePrimitiveProps } from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    type FormComponentProps
} from "~/FormComponent";

type FileProps = FilePrimitiveProps & FormComponentProps;

const DecoratableFile = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    validate,
    onBlur: originalOnBlur,
    ...props
}: FileProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    const onBlur = useCallback(
        async (e: React.FocusEvent<HTMLInputElement>) => {
            if (validate) {
                // Since we are accessing event in an async operation, we need to persist it.
                // See https://reactjs.org/docs/events.html#event-pooling.
                e.persist();
                await validate();
            }
            originalOnBlur && originalOnBlur(e);
        },
        [validate, originalOnBlur]
    );

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <FilePrimitive {...props} disabled={disabled} invalid={invalid} onBlur={onBlur} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const File = makeDecoratable("File", DecoratableFile);

export { File, type FileProps };
