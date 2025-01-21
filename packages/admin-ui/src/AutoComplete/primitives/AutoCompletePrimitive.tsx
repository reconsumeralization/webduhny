import React, { KeyboardEvent } from "react";
import { Command } from "~/Command";
import { Popover } from "~/Popover";
import { InputPrimitiveProps } from "~/Input";
import { useAutoComplete } from "./useAutoComplete";
import { AutoCompleteInputIcons, AutoCompleteList } from "./components";
import { AutoCompleteOption } from "./domains";

type AutoCompletePrimitiveProps = Omit<InputPrimitiveProps, "endIcon"> & {
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
     * Callback triggered when a value has been searched by the user.
     */
    onValueSearch?: (value: string) => void;
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
    /**
     * Indicates if the reset action should be displayed.
     */
    displayResetAction?: boolean;
};

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const {
        vm,
        setListOpenState,
        setSelectedOption,
        searchOption,
        resetSelectedOption,
        showSelectedOption
    } = useAutoComplete(props);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (props.disabled) {
                return;
            }

            if (event.key.toLowerCase() === "escape") {
                setListOpenState(false);
            } else {
                setListOpenState(true);
            }
        },
        [props.disabled, setListOpenState]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    const handleOnBlur = React.useCallback(() => {
        setListOpenState(false);
        showSelectedOption();
    }, [setListOpenState]);

    return (
        <Popover open={vm.optionsListVm.isOpen} onOpenChange={() => setListOpenState(true)}>
            <Command label={props.label} onKeyDown={handleKeyDown}>
                <Popover.Trigger asChild>
                    <span>
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
                                    displayResetAction={vm.inputVm.displayResetAction}
                                    isDisabled={props.disabled}
                                    onResetValue={resetSelectedOption}
                                    onOpenChange={() => setListOpenState(!vm.optionsListVm.isOpen)}
                                />
                            }
                            onBlur={handleOnBlur}
                            onFocus={() => setListOpenState(true)}
                        />
                    </span>
                </Popover.Trigger>
                <Popover.Content
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                    onOpenAutoFocus={e => e.preventDefault()}
                >
                    <AutoCompleteList
                        options={vm.optionsListVm.options}
                        onOptionSelect={handleSelectOption}
                        isEmpty={vm.optionsListVm.isEmpty}
                        isLoading={props.isLoading}
                        loadingMessage={vm.optionsListVm.loadingMessage}
                        emptyMessage={vm.optionsListVm.emptyMessage}
                        optionRenderer={props.optionRenderer}
                    />
                </Popover.Content>
            </Command>
        </Popover>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps };
