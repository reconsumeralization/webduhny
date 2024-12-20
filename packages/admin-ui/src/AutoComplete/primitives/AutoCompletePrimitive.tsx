import React, { KeyboardEvent } from "react";
import { Command } from "~/Command";
import { InputPrimitiveProps } from "~/Input";
import { useAutoComplete } from "./useAutoComplete";
import { AutoCompleteInputIcons, AutoCompleteList } from "./components";
import { AutoCompleteOption } from "./domains";

type AutoCompletePrimitiveProps = InputPrimitiveProps & {
    /**
     * Accessible label for the command menu. Not shown visibly.
     */
    label?: string;
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
     * Callback triggered when the value changes.
     */
    onValueChange: (value: string) => void;
    /**
     * Callback triggered to reset the value.
     */
    onValueReset?: () => void;
    /**
     * List of options for the autocomplete.
     */
    options?: AutoCompleteOption[];
    /**
     * Custom renderer for the options.
     */
    optionRenderer?: (item: any, index: number) => React.ReactNode;
    /**
     * Optional selected item.
     */
    value?: string;
};

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const { vm, setListOpenState, setSelectedOption, searchOption, resetSelectedOption } =
        useAutoComplete(props);

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

            if (event.key.toLowerCase() === "backspace") {
                setListOpenState(true);
                const inputValue = (event.target as HTMLInputElement).value;
                setSelectedOption("");
                searchOption(inputValue);
            }
        },
        [props.disabled, setListOpenState, setSelectedOption]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    return (
        <Command label={props.label} onKeyDown={handleKeyDown}>
            <Command.Input
                value={vm.inputVm.value}
                onValueChange={searchOption}
                placeholder={vm.inputVm.placeholder}
                size={props.size}
                variant={props.variant}
                disabled={props.disabled}
                invalid={props.invalid}
                startIcon={props.startIcon}
                endIcon={
                    <AutoCompleteInputIcons
                        hasValue={vm.inputVm.hasValue}
                        onResetValue={resetSelectedOption}
                        onOpenChange={() => setListOpenState(!vm.optionsListVm.isOpen)}
                    />
                }
                onBlur={() => setListOpenState(false)}
                onFocus={() => setListOpenState(true)}
            />
            <AutoCompleteList
                options={vm.optionsListVm.options}
                onOptionSelect={handleSelectOption}
                isEmpty={vm.optionsListVm.isEmpty}
                isLoading={props.isLoading}
                isOpen={vm.optionsListVm.isOpen}
                loadingMessage={vm.optionsListVm.loadingMessage}
                emptyMessage={vm.optionsListVm.emptyMessage}
                optionRenderer={props.optionRenderer}
            />
        </Command>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps, type AutoCompleteOption };
