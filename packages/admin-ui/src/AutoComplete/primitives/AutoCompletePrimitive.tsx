import React, { KeyboardEvent } from "react";
import { Command, CommandProps } from "~/Command";
import { cn, cva } from "~/utils";
import { InputPrimitiveProps } from "~/Input";
import { useAutoComplete } from "./useAutoComplete";
import { AutoCompleteInputIcons } from "./components";
import { AutoCompleteOption } from "./domains";

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

type AutoCompletePrimitiveProps = CommandProps &
    InputPrimitiveProps & {
        emptyMessage?: React.ReactNode;
        isLoading?: boolean;
        loadingMessage?: React.ReactNode;
        onOpenChange?: (open: boolean) => void;
        onValueChange: (value: string) => void;
        onValueReset?: () => void;
        options?: AutoCompleteOption[];
        optionRenderer?: (item: any, index: number) => React.ReactNode;
    };

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const { vm, setListOpenState, setSelectedOption, setInputValue, resetValue } =
        useAutoComplete(props);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key.toLowerCase() === "escape") {
                setListOpenState(false);
            }

            if (event.key.toLowerCase() === "backspace") {
                setListOpenState(true);
                setSelectedOption("");
            }
        },
        [setListOpenState, setSelectedOption]
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
            <Command.Input
                value={vm.inputVm.value}
                onValueChange={setInputValue}
                placeholder={vm.inputVm.placeholder}
                size={props.size}
                variant={props.variant}
                disabled={props.disabled}
                invalid={props.invalid}
                startIcon={props.startIcon}
                endIcon={
                    <AutoCompleteInputIcons
                        hasValue={vm.inputVm.hasValue}
                        onResetValue={resetValue}
                        onOpenChange={() => setListOpenState(!vm.listVm.isOpen)}
                    />
                }
                onBlur={() => setListOpenState(false)}
                onFocus={() => setListOpenState(true)}
            />
            <div className="relative">
                <div className={cn(commandListVariants({ open: vm.listVm.isOpen }))}>
                    <Command.List
                        options={vm.listVm.options}
                        onOptionSelect={handleSelectOption}
                        isLoading={props.isLoading}
                        loadingMessage={vm.listVm.loadingMessage}
                        emptyMessage={vm.listVm.emptyMessage}
                        optionRenderer={props.optionRenderer}
                    />
                </div>
            </div>
        </Command>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps, type AutoCompleteOption };
