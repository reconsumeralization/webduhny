import React, { useCallback, useMemo } from "react";
import { AutoCompleteBaseProps } from "./types";
import { MultiAutoComplete as AdminMultiAutoComplete } from "@webiny/admin-ui";

interface SelectionItem {
    name: string;
}

type MultiAutoCompletePropsValue = SelectionItem[] | string[];

export interface MultiAutoCompleteProps extends Omit<AutoCompleteBaseProps, "value"> {
    /**
     * Prevents adding the same item to the list twice.
     */
    unique?: boolean;

    /**
     * Set if custom values (not from list of suggestions) are allowed.
     */
    allowFreeInput?: boolean;

    /**
     *  If true, will show a loading spinner on the right side of the input.
     */
    loading?: boolean;

    /**
     * Use custom renderer for selected items.
     */
    renderMultipleSelection?: ((items: any, index: number) => React.ReactNode | null) | null;

    /**
     * Use data list instead of default Chips component. Useful when expecting a lot of data.
     */
    useMultipleSelectionList?: boolean;

    /**
     * Render list item when `useMultipleSelectionList` is used.
     */
    renderListItemLabel?: (item: any) => React.ReactNode;

    /**
     * Render in meta wrapper
     */
    renderListItemOptions?: (item: any) => React.ReactNode | null;

    /**
     *  A component that renders supporting UI in case of no result found.
     */
    noResultFound?: React.ReactNode;

    /**
     * Value is an array of strings. But can be undefined.
     */
    value?: MultiAutoCompletePropsValue;

    /**
     * Indicates if the reset action should be displayed.
     */
    displayResetAction?: boolean;
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
    onInput,
    ...props
}: MultiAutoCompleteProps) => {
    const getOption = useCallback(
        (option: any) => {
            if (useSimpleValues) {
                return {
                    label: option,
                    value: option,
                    item: option
                };
            }

            return {
                label: option[textProp],
                value: option[valueProp],
                disabled: option.disabled,
                item: option
            };
        },
        [textProp, valueProp, useSimpleValues]
    );

    const options = useMemo(() => {
        return props.options.map(option => {
            return getOption(option);
        });
    }, [props.options]);

    const values = useMemo(() => {
        if (!value) {
            return [];
        }

        return value
            .map((val: SelectionItem | string) => {
                if (typeof val === "string") {
                    return val;
                }

                return val[valueProp as keyof SelectionItem] as string;
            })
            .filter(Boolean);
    }, [value, valueProp]);

    const onValuesChange = useCallback(
        (values: any) => {
            const selectedOptions = [];

            for (const value of values) {
                const option = options.find(option => option.value === value);

                if (option) {
                    selectedOptions.push(option);
                } else {
                    selectedOptions.push(getOption(value));
                }
            }

            const selectedItems = selectedOptions.map(option => option.item);

            onChange?.(selectedItems);
        },
        [onChange, options]
    );

    const selectedOptionRenderer = useMemo(() => {
        if (renderMultipleSelection === null) {
            return () => null;
        }
        return renderMultipleSelection;
    }, [renderMultipleSelection]);

    return (
        <>
            <AdminMultiAutoComplete
                {...props}
                size={"lg"}
                values={values}
                options={options}
                optionRenderer={renderItem}
                selectedOptionRenderer={selectedOptionRenderer}
                emptyMessage={noResultFound}
                onValuesChange={onValuesChange}
                onValueSearch={onInput}
                loading={loading}
                allowFreeInput={allowFreeInput}
                uniqueValues={unique}
            />
        </>
    );
};
