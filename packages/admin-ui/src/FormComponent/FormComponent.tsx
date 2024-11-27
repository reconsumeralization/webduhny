import React, { useMemo } from "react";
import { Label } from "~/Label";
import { FormComponentDescription } from "./Description";
import { FormComponentErrorMessage } from "./ErrorMessage";
import { FormComponentNote } from "./Note";
import { FormComponentLabel } from "./Label";

interface FormComponentProps {
    label?: React.ReactElement<typeof Label> | React.ReactNode;

    description?: React.ReactNode;

    note?: React.ReactNode;

    required?: boolean;

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
    children,
    required
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
            <FormComponentLabel text={label} required={required} />
            <FormComponentDescription text={description} />
            {renderChildrenWithInvalidProp()}
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </>
    );
};

export { FormComponent, type FormComponentProps };
