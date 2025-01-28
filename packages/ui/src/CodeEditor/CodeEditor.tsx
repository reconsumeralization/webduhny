import React from "react";
import { CodeEditor as AdminCodeEditor } from "@webiny/admin-ui";
import { FormComponentProps } from "~/types";

interface Props extends FormComponentProps {
    mode: string;

    theme: string;

    readOnly?: boolean;

    // Description beneath the input.
    description?: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `CodeEditor` component props from the `@webiny/admin-ui` package instead.
 */
export const CodeEditor = ({ readOnly, ...props }: Props) => {
    return <AdminCodeEditor disabled={readOnly} {...props} />;
};
