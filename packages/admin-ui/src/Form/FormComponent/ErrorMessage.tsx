import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface ErrorMessageProps {
    text: React.ReactNode;
}

const DecoratableErrorMessage = (props: ErrorMessageProps) => {
    return (
        <Text
            text={props.text}
            size={"sm"}
            as={"div"}
            className={"py-xs text-destructive-primary font-semibold"}
        />
    );
};

const ErrorMessage = makeDecoratable("Error", DecoratableErrorMessage);

export { ErrorMessage, type ErrorMessageProps };
