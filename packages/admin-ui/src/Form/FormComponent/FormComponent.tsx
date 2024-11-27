import React, { useMemo } from "react";
import { Label } from "~/Label";
import { Description } from "./Description";
import { ErrorMessage } from "./ErrorMessage";
import { Note } from "./Note";

interface FormComponentProps {
    label?: React.ReactElement<typeof Label> | React.ReactNode;

    description?: React.ReactElement<typeof Description> | React.ReactNode;

    note?: React.ReactElement<typeof Note> | React.ReactNode;

    validation?: {
        /* Is form element's value valid? */
        isValid: boolean | null;
        /* Error message if value is not valid. */
        message?: string;
        /* Any validation result returned by the validator. */
        results?: { [key: string]: any };
    };

    /* Provided by <Form> component to perform validation when value has changed. */
    validate?: () => Promise<boolean | any>;
}

interface FormComponentRendererProps extends FormComponentProps {
    children: React.ReactNode;
}

const FormComponent = ({
    label,
    description,
    note,
    validation,
    children
}: FormComponentRendererProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    const renderChildrenWithInvalidProp = () =>
        React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                // Ensure TypeScript knows `invalid` can be added
                return React.cloneElement(child as React.ReactElement<any>, {
                    invalid,
                    child
                });
            }
            return child;
        });

    return (
        <>
            {typeof label === "string" ? <Label text={label} /> : label}
            {typeof description === "string" ? <Description text={description} /> : description}
            {renderChildrenWithInvalidProp()}
            {invalid && <ErrorMessage text={validationMessage} />}
            {typeof note === "string" ? <Note text={note} /> : note}
        </>
    );
};

export { FormComponent, type FormComponentProps };
