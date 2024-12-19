import React, { useCallback, useMemo } from "react";
import { AutoCompleteBaseProps } from "./types";
import { MultiAutoComplete as AdminMultiAutoComplete } from "@webiny/admin-ui";

interface SelectionItem {
    name: string;
}

type MultiAutoCompletePropsValue = SelectionItem[] | string[];

export interface MultiAutoCompleteProps extends Omit<AutoCompleteBaseProps, "value"> {
    /**
     * @deprecated Use `uniqueValues` instead.
     * Prevents adding the same item to the list twice.
     */
    unique: boolean;

    /**
     * Set if custom values (not from list of suggestions) are allowed.
     */
    allowFreeInput?: boolean;

    /**
     *  @deprecated Use `loading` instead.
     *  If true, will show a loading spinner on the right side of the input.
     */
    loading?: boolean;

    /**
     * @deprecated Use `selectedOptionRenderer` instead
     * Use custom renderer for selected items.
     */
    renderMultipleSelection?: ((items: any, index: number) => React.ReactNode | null) | null;

    /**
     * @deprecated
     * Use data list instead of default Chips component. Useful when expecting a lot of data.
     */
    useMultipleSelectionList?: boolean;

    /**
     * @deprecated
     * Render list item when `useMultipleSelectionList` is used.
     */
    renderListItemLabel?: (item: any) => React.ReactNode;

    /**
     * Render in meta wrapper
     */
    renderListItemOptions?: (item: any) => React.ReactNode | null;

    /**
     *  @deprecated Use `emptyMessage` instead
     *  A component that renders supporting UI in case of no result found.
     */
    noResultFound?: React.ReactNode;

    /**
     * Value is an array of strings. But can be undefined.
     */
    value?: MultiAutoCompletePropsValue;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `MultiAutoComplete` component from the `@webiny/admin-ui` package instead.
 */
export const MultiAutoComplete = ({
    onChange,
    value = [],
    valueProp = "id",
    textProp = "name",
    renderItem,
    noResultFound,
    useSimpleValues,
    loading,
    allowFreeInput,
    unique = true,
    renderMultipleSelection,
    ...props
}: MultiAutoCompleteProps) => {
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

    const values = useMemo(() => {
        return value.map(value => {
            if (typeof value === "string") {
                return value;
            }

            if (useSimpleValues) {
                return value?.name ?? value;
            }

            return value.name;
        });
    }, [value, useSimpleValues]);

    const onValuesChange = useCallback(
        (values: any) => {
            onChange?.(values);
        },
        [onChange]
    );

    return (
        <>
            <AdminMultiAutoComplete
                {...props}
                values={values}
                options={options}
                optionRenderer={renderItem}
                selectedOptionRenderer={
                    renderMultipleSelection ? renderMultipleSelection : undefined
                }
                emptyMessage={noResultFound}
                onValuesChange={onValuesChange}
                isLoading={loading}
                allowFreeInput={allowFreeInput}
                uniqueValues={unique}
            />
        </>
    );
};
