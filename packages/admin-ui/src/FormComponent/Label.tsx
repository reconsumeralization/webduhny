import React from "react";
import { makeDecoratable } from "~/utils";
import { Label, LabelProps } from "~/Label";

interface FormComponentLabelProps {
    text?: React.ReactElement<typeof Label> | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
}

const DecoratableFormComponentLabel = (props: FormComponentLabelProps) => {
    if (!props.text) {
        return null;
    }

    if (React.isValidElement(props.text) && props.text.type === Label) {
        return React.cloneElement(props.text as React.ReactElement<LabelProps>, {
            required: props.required,
            disabled: props.disabled
        });
    }

    return <Label text={props.text} required={props.required} disabled={props.disabled} />;
};

const FormComponentLabel = makeDecoratable("FormComponentLabel", DecoratableFormComponentLabel);

export { FormComponentLabel, type FormComponentLabelProps };
