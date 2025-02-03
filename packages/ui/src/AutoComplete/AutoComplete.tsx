import React, { useCallback, useMemo } from "react";
import { AutoCompleteBaseProps } from "./types";
import { AutoComplete as AdminAutoComplete } from "@webiny/admin-ui";

export enum Placement {
    top = "top",
    bottom = "bottom"
}

export interface AutoCompleteProps extends Omit<AutoCompleteBaseProps, "onChange"> {
    /* Placement position of dropdown menu, can be either `top` or `bottom`. */
    placement?: Placement;

    /* A callback that is executed each time a value is changed. */
    onChange?: (value: any, selection?: any) => void;

    /* If true, will show a loading spinner on the right side of the input. */
    loading?: boolean;

    /* A component that renders supporting UI in case of no result found. */
    noResultFound?: React.ReactNode;

    // Size - small, medium or large
    size?: "small" | "medium" | "large";

    // Indicates if the reset action should be displayed.
    displayResetAction?: boolean;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `AutoComplete` component from the `@webiny/admin-ui` package instead.
 */
export const AutoComplete = ({
    size,
    onChange,
    valueProp = "id",
    textProp = "name",
    renderItem,
    noResultFound,
    useSimpleValues,
    onInput,
    ...props
}: AutoCompleteProps) => {
    const inputSize = useMemo(() => {
        if (size === "medium") {
            return "md";
        }

        return "lg";
    }, [size]);

    const options = useMemo(() => {
        return props.options.map(option => {
            if (useSimpleValues) {
                return {
                    label: option,
                    value: option
                };
            }

            return {
                label: option[textProp],
                value: option[valueProp],
                disabled: option.disabled,
                item: option
            };
        });
    }, [props.options, textProp, valueProp, useSimpleValues]);

    const value = useMemo(() => {
        if (!props.value) {
            return undefined;
        }

        return props.value[valueProp as keyof AutoCompleteProps["value"]] as string;
    }, [props.value, valueProp]);

    const onValueChange = useCallback(
        (value: any) => {
            const option = options.find(option => option.value === value);

            if (!option) {
                return;
            }

            onChange?.(value, option.item);
        },
        [onChange, options]
    );

    return (
        <AdminAutoComplete
            {...props}
            value={value}
            options={options}
            onValueChange={onValueChange}
            onValueSearch={onInput}
            size={inputSize}
            optionRenderer={renderItem}
            emptyMessage={noResultFound}
        />
    );
};
