import React, { useState, useEffect, useCallback } from "react";
import omit from "lodash/omit";
import { Validation } from "@webiny/form";
import debounce from "lodash/debounce";
import { useIsMounted } from "@webiny/app-admin";
import { Input as AdminUiInput } from "@webiny/admin-ui";

interface GetValueCallableParams {
    value: string | number;
    type: string;
    defaultValue: string | number;
}

interface GetValueCallable {
    (params: GetValueCallableParams): string | number;
}

const getValue: GetValueCallable = ({ value, defaultValue, type }) => {
    if (type === "number") {
        return isNaN(value as number) ? defaultValue : value;
    }
    return value || defaultValue;
};

interface InputBoxProps {
    value?: string | number;
    onChange?: (value: string) => void;
    defaultValue?: string | number;
    description?: string;
    label?: string;
    className?: string;
    validation?: Validation;
    type?: "string" | "number";

    [key: string]: any;
}

const InputField = ({
    value,
    onChange,
    label,
    description,
    validation = {
        isValid: true
    },
    defaultValue = "",
    ...props
}: InputBoxProps) => {
    // We introduced the local value concept in order to fix the cursor positioning issue.
    // Basically, users would type into the field, and the cursor would jump to the end of the input field.
    // This is because the value was being set from the outside, and the component was re-rendering.
    // By introducing the local value, we can control when the value is updated.
    // Original PR: https://github.com/webiny/webiny-js/pull/3146

    // Also note that we've tried to get rid of this and fix the root issue that's causing
    // the cursor to jump to the end of the input field, but we couldn't find a solution.
    // This was mainly because of the async nature of the onChange callback. For example,
    // if we removed the async validation in PropertySettings.tsx, the cursor would no longer jump.
    const [localValue, setLocalValue] = useState<string | number | undefined>();
    const { isMounted } = useIsMounted();

    const debouncedSetLocalValue = useCallback(
        debounce(value => {
            if (isMounted()) {
                setLocalValue(value);
            }
        }, 100),
        []
    );

    // On all outside changes, we need to update the local value. Note the debounced
    // `setLocalValue` call. This resolves the issue where the cursor would jump to
    // the end of the input field while typing.
    useEffect(() => {
        debouncedSetLocalValue(value);
    }, [localValue, value]);

    return (
        <AdminUiInput
            label={label}
            value={getValue({
                value: localValue as string,
                type: props.type || "string",
                defaultValue
            })}
            description={description}
            onChange={value => {
                if (!onChange) {
                    return;
                }
                onChange(value);
                setLocalValue(value);
            }}
            {...omit(props, "validate")}
        />
    );
};

export default React.memo(InputField);
