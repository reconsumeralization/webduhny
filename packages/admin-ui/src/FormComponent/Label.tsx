import React, { useMemo } from "react";
import { cn, makeDecoratable } from "~/utils";
import { Label, LabelProps } from "~/Label";

interface FormComponentLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: React.ReactElement<typeof Label> | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
}

const DecoratableFormComponentLabel = ({
    text,
    required,
    disabled,
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
                required,
                disabled
            });
        }

        return <Label text={text} required={required} disabled={disabled} />;
    }, [text, required, disabled]);

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
