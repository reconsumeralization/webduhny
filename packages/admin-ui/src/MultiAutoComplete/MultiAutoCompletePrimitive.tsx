import React, { KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandList, CommandInput, Command, CommandOptionDto } from "~/Command";
import { cn, cva } from "~/utils";
import { InputPrimitiveProps } from "~/Input";
import { useMultiAutoComplete } from "./useMultiAutoComplete";
import { MultiAutoCompleteInputIcons } from "./MultiAutoCompleteInputIcons";

const commandListVariants = cva(
    "animate-in fade-in-0 zoom-in-95 absolute top-xs-plus z-10 w-full outline-none",
    {
        variants: {
            open: {
                true: "block",
                false: "hidden"
            }
        }
    }
);

type MultiAutoCompleteOption = CommandOptionDto | string;

type MultiAutoCompletePrimitiveProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> &
    InputPrimitiveProps & {
        emptyMessage?: React.ReactNode;
        isLoading?: boolean;
        loadingMessage?: React.ReactNode;
        onOpenChange?: (open: boolean) => void;
        onValueReset?: () => void;
        onValuesChange: (values: string[]) => void;
        optionRenderer?: (item: any, index: number) => React.ReactNode;
        options?: MultiAutoCompleteOption[];
        values: string[];
    };

const MultiAutoCompletePrimitive = (props: MultiAutoCompletePrimitiveProps) => {
    const {
        vm,
        setListOpenState,
        setSelectedOption,
        setInputValue,
        removeSelectedOption,
        resetValues
    } = useMultiAutoComplete(props);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!vm.listVm.isOpen) {
                setListOpenState(true);
            }

            if (event.key.toLowerCase() === "escape") {
                setListOpenState(false);
            }

            if (event.key.toLowerCase() === "backspace") {
                setListOpenState(true);
                setSelectedOption("");
            }
        },
        [setListOpenState, setSelectedOption, setInputValue, vm.listVm.isOpen]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    return (
        <Command onKeyDown={handleKeyDown}>
            <CommandInput
                value={vm.inputVm.value}
                onValueChange={setInputValue}
                placeholder={vm.inputVm.placeholder}
                size={props.size}
                variant={props.variant}
                disabled={props.disabled}
                invalid={props.invalid}
                startIcon={props.startIcon}
                endIcon={
                    <MultiAutoCompleteInputIcons
                        hasValue={vm.inputVm.hasValue}
                        onResetValue={resetValues}
                        onOpenChange={() => setListOpenState(!vm.listVm.isOpen)}
                    />
                }
                onBlur={() => setListOpenState(false)}
                onFocus={() => setListOpenState(true)}
            />
            {vm.selectedOptionsVm.options.map(option => (
                <span key={option.value}>
                    {option.label}
                    <button onClick={() => removeSelectedOption(option.value)}>x</button>
                </span>
            ))}
            <div className="relative">
                <div className={cn(commandListVariants({ open: vm.listVm.isOpen }))}>
                    <CommandList
                        options={vm.listVm.options}
                        onOptionSelect={handleSelectOption}
                        isLoading={props.isLoading}
                        emptyMessage={vm.listVm.emptyMessage}
                        optionRenderer={props.optionRenderer}
                    />
                </div>
            </div>
        </Command>
    );
};

export {
    MultiAutoCompletePrimitive,
    type MultiAutoCompletePrimitiveProps,
    type MultiAutoCompleteOption
};
