import React from "react";
import { FormEditorFieldError } from "~/admin/components/FormEditor/Context";
import { Alert, Text } from "@webiny/admin-ui";

const keyNames: Record<string, string> = {
    label: "Label",
    fieldId: "Field ID",
    helpText: "Help Text",
    placeholderText: "Placeholder Text",
    ["settings.defaultValue"]: "Default value"
};

interface FieldErrorsProps {
    errors: FormEditorFieldError[] | null;
}
interface FieldErrorProps {
    error: FormEditorFieldError;
}

export const FieldError = ({ error }: FieldErrorProps) => {
    return (
        <>
            <div>
                <Text className={"wby-font-semibold"}>{error.label}</Text>
            </div>
            {Object.keys(error.errors).map(key => {
                return (
                    <div key={key}>
                        {keyNames[key] || "unknown"}: {error.errors[key]}
                    </div>
                );
            })}
        </>
    );
};

export const FieldErrors = ({ errors }: FieldErrorsProps) => {
    if (!errors) {
        return null;
    }
    return (
        <Alert title={"Error while saving form!"} type="warning">
            {errors.map(error => {
                return <FieldError error={error} key={`${error.fieldId}`} />;
            })}
        </Alert>
    );
};
