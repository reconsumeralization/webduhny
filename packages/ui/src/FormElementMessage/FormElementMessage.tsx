import React from "react";
import { FormComponentErrorMessage, FormComponentNote } from "@webiny/admin-ui";

type FormElementMessageProps = {
    // message to display
    children: React.ReactNode;

    // optional class name
    className?: string;

    // is it an error message we're displaying
    error?: boolean;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `FormComponent` components from the `@webiny/admin-ui` package instead.
 */
const FormElementMessage = ({ error, children, ...props }: FormElementMessageProps) => {
    if (error) {
        return <FormComponentErrorMessage {...props} invalid={error} text={children} />;
    }

    return <FormComponentNote {...props} text={children} />;
};

export { FormElementMessage };
