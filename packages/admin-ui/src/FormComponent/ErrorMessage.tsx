import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentErrorMessageProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
    invalid?: boolean;
}

const DecoratableFormComponentErrorMessage = (props: FormComponentErrorMessageProps) => {
    if (!props.invalid || !props.text) {
        return null;
    }

    return (
        <Text
            size={"sm"}
            as={"div"}
            className={"wby-mt-xs wby-text-destructive-primary wby-font-semibold"}
        >
            {props.text}
        </Text>
    );
};

const FormComponentErrorMessage = makeDecoratable(
    "FormComponentErrorMessage",
    DecoratableFormComponentErrorMessage
);

export { FormComponentErrorMessage, type FormComponentErrorMessageProps };
