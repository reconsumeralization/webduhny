import React, { KeyboardEvent } from "react";
import { Command } from "~/Command";
import { Popover } from "~/Popover";
import { InputPrimitiveProps } from "~/Input";
import { useMultiAutoComplete } from "./useMultiAutoComplete";
import {
    MultiAutoCompleteInput,
    MultiAutoCompleteInputIcons,
    MultiAutoCompleteList
} from "./components";
import { MultiAutoCompleteOption } from "./domains";

type MultiAutoCompletePrimitiveProps = Omit<
    InputPrimitiveProps,
    "endIcon" | "value" | "onValueChange"
> & {
    /**
     * Accessible label for the command menu. Not shown visibly.
     */
    label?: string;
    /**
     * Allows free input of values not present in the options.
     */
    allowFreeInput?: boolean;
    /**
     * Message to display when there are no options.
     */
    emptyMessage?: React.ReactNode;
    /**
     * Indicates if the autocomplete is loading options.
     */
    isLoading?: boolean;
    /**
     * Message to display while loading options.
     */
    loadingMessage?: React.ReactNode;
    /**
     * Callback triggered when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Callback triggered when the values change.
     */
    onValuesChange: (values: string[]) => void;
    /**
     * Callback triggered to reset the values.
     */
    onValuesReset?: () => void;
    /**
     * Custom renderer for the options.
     */
    optionRenderer?: (item: any, index: number) => React.ReactNode;
    /**
     * List of options for the autocomplete.
     */
    options?: MultiAutoCompleteOption[];
    /**
     * Custom renderer for the selected options.
     */
    selectedOptionRenderer?: (item: any, index: number) => React.ReactNode;
    /**
     * Ensures that each value is unique.
     */
    uniqueValues?: boolean;
    /**
     * Optional selected items.
     */
    values: string[];
    /**
     * Indicates if the reset action should be displayed.
     */
    displayResetAction?: boolean;
};

const MultiAutoCompletePrimitive = (props: MultiAutoCompletePrimitiveProps) => {
    const {
        vm,
        setListOpenState,
        setSelectedOption,
        searchOption,
        removeSelectedOption,
        resetSelectedOptions,
        createOption
    } = useMultiAutoComplete(props);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (props.disabled) {
                return;
            }

            if (!vm.optionsListVm.isOpen) {
                setListOpenState(true);
            }

            if (event.key.toLowerCase() === "escape") {
                setListOpenState(false);
            }
        },
        [props.disabled, setListOpenState, setSelectedOption, vm.optionsListVm.isOpen]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    const handleCreateOption = React.useCallback(
        (value: string) => {
            createOption(value);
            setListOpenState(false);
        },
        [createOption, setListOpenState]
    );

    return (
        <Popover open={vm.optionsListVm.isOpen} onOpenChange={() => setListOpenState(true)}>
            <Command label={props.label} onKeyDown={handleKeyDown}>
                <Popover.Trigger asChild>
                    <span>
                        <MultiAutoCompleteInput
                            value={vm.inputVm.value}
                            placeholder={vm.inputVm.placeholder}
                            changeValue={searchOption}
                            closeList={() => setListOpenState(false)}
                            openList={() => setListOpenState(true)}
                            variant={props.variant}
                            size={props.size}
                            invalid={props.invalid}
                            removeSelectedOption={removeSelectedOption}
                            selectedOptionRenderer={props.selectedOptionRenderer}
                            selectedOptions={vm.selectedOptionsVm.options}
                            disabled={props.disabled}
                            startIcon={props.startIcon}
                            endIcon={
                                <MultiAutoCompleteInputIcons
                                    displayResetAction={
                                        !vm.selectedOptionsVm.isEmpty &&
                                        vm.inputVm.displayResetAction
                                    }
                                    isDisabled={props.disabled}
                                    onResetValue={resetSelectedOptions}
                                    onOpenChange={() => setListOpenState(!vm.optionsListVm.isOpen)}
                                />
                            }
                        />
                    </span>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        style={{ width: "var(--radix-popover-trigger-width)" }}
                        onOpenAutoFocus={e => e.preventDefault()}
                    >
                        <MultiAutoCompleteList
                            emptyMessage={vm.optionsListVm.emptyMessage}
                            isEmpty={vm.optionsListVm.isEmpty}
                            isLoading={props.isLoading}
                            loadingMessage={vm.optionsListVm.loadingMessage}
                            onOptionCreate={handleCreateOption}
                            onOptionSelect={handleSelectOption}
                            optionRenderer={props.optionRenderer}
                            options={vm.optionsListVm.options}
                            temporaryOption={vm.temporaryOptionVm.option}
                        />
                    </Popover.Content>
                </Popover.Portal>
            </Command>
        </Popover>
    );
};

export { MultiAutoCompletePrimitive, type MultiAutoCompletePrimitiveProps };
