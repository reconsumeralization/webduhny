import React, { KeyboardEvent } from "react";
import { CommandList, Command, CommandOptionDto, CommandProps } from "~/Command";
import { cn, cva } from "~/utils";
import { InputPrimitiveProps } from "~/Input";
import { useMultiAutoComplete } from "../features/useMultiAutoComplete";
import { MultiAutoCompleteInputIcons } from "./MultiAutoCompleteInputIcons";
import { MultiAutoCompleteInput } from "./MultiAutoCompleteInput";

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

type MultiAutoCompletePrimitiveProps = CommandProps &
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
        searchOption,
        removeSelectedOption,
        resetSelectedOptions
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

            if (event.key.toLowerCase() === "backspace") {
                setListOpenState(true);
                setSelectedOption("");
            }
        },
        [setListOpenState, setSelectedOption, vm.optionsListVm.isOpen]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    return (
        <Command onKeyDown={handleKeyDown} className={"h-auto overflow-visible"}>
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
                selectedOptions={vm.selectedOptionsVm.options}
                disabled={props.disabled}
                startIcon={props.startIcon}
                endIcon={
                    <MultiAutoCompleteInputIcons
                        hasValue={!vm.selectedOptionsVm.isEmpty}
                        onResetValue={resetSelectedOptions}
                        onOpenChange={() => setListOpenState(!vm.optionsListVm.isOpen)}
                    />
                }
            />

            <div className="relative">
                <div className={cn(commandListVariants({ open: vm.optionsListVm.isOpen }))}>
                    <CommandList
                        options={vm.optionsListVm.options}
                        onOptionSelect={handleSelectOption}
                        isLoading={props.isLoading}
                        emptyMessage={vm.optionsListVm.emptyMessage}
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
