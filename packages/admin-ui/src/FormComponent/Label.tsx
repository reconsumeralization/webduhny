import React, { useMemo } from "react";
import { cn, makeDecoratable } from "~/utils";
import { Label, LabelProps } from "~/Label";

interface FormComponentLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: React.ReactElement<typeof Label> | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    hint?: React.ReactNode;
}

const DecoratableFormComponentLabel = ({
    text,
    required,
    disabled,
    hint,
    className,
    ...props
}: FormComponentLabelProps) => {
    // UseMemo correctly to memoize the rendered label
    const renderLabel = useMemo(() => {
        if (!text) {
            return null;
        }

        if (React.isValidElement(text) && text.type === Label) {
            return React.cloneElement(text as React.ReactElement<LabelProps>, {
                ...text.props,
                required: text.props.required ?? required,
                disabled: text.props.disabled ?? disabled,
                hint: text.props.hint ?? hint
            });
        }

        return <Label text={text} required={required} disabled={disabled} hint={hint} />;
    }, [text, required, disabled, hint]);

    if (!renderLabel) {
        return null;
    }

    return (
        <div {...props} className={cn("wby-mb-xs", className)}>
            {renderLabel}
        </div>
    );
};

const FormComponentLabel = makeDecoratable("FormComponentLabel", DecoratableFormComponentLabel);

export { FormComponentLabel, type FormComponentLabelProps };
