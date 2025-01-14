import React from "react";
import { getIconPosition, InputIcon, InputPrimitiveProps, inputVariants } from "~/Input";
import { Command, CommandOptionFormatted } from "~/Command";
import { Tag } from "~/Tag";
import { cn, cva, VariantProps } from "~/utils";

const multiAutoCompleteInputVariants = cva("relative placeholder:text-neutral-dimmed", {
    variants: {
        disabled: {
            true: "cursor-not-allowed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
        }
    }
});

type MultiAutoCompleteInputProps = VariantProps<typeof multiAutoCompleteInputVariants> &
    InputPrimitiveProps & {
        changeValue: (value: string) => void;
        closeList: () => void;
        openList: () => void;
        placeholder: string;
        removeSelectedOption: (value: string) => void;
        selectedOptionRenderer?: (item: any, index: number) => React.ReactNode;
        selectedOptions: CommandOptionFormatted[];
        value: string;
    };

const MultiAutoCompleteInput = ({
    changeValue,
    closeList,
    disabled,
    endIcon,
    invalid,
    openList,
    placeholder,
    removeSelectedOption,
    selectedOptionRenderer,
    selectedOptions,
    size,
    startIcon,
    value,
    variant,
    className,
    ...props
}: MultiAutoCompleteInputProps) => {
    const [focused, setFocused] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const iconPosition = getIconPosition(startIcon, endIcon);

    const renderSelectedOptions = React.useCallback(
        (options: CommandOptionFormatted[]) => {
            return options.map((option, index) => {
                if (selectedOptionRenderer) {
                    if (!option.item) {
                        return null;
                    }
                    return selectedOptionRenderer.call(this, option.item, index);
                }

                return (
                    <Tag
                        key={`tag-${option.value}-${index}`}
                        variant={"neutral-light"}
                        content={option.label}
                        onDismiss={() => removeSelectedOption(option.value)}
                    />
                );
            });
        },
        [selectedOptionRenderer, removeSelectedOption]
    );

    return (
        <div
            {...props}
            className={cn(
                inputVariants({
                    variant,
                    size,
                    iconPosition,
                    invalid
                }),
                multiAutoCompleteInputVariants({ disabled }),
                className
            )}
            aria-disabled={disabled}
            onClick={() => {
                if (disabled) {
                    return;
                }
                inputRef?.current?.focus();
                setFocused(true);
            }}
            data-disabled={disabled}
            data-focused={focused}
        >
            {startIcon && (
                <InputIcon
                    disabled={disabled}
                    icon={startIcon}
                    inputSize={size}
                    position={"start"}
                />
            )}
            <div className="relative flex flex-wrap gap-xs">
                {renderSelectedOptions(selectedOptions)}
                <Command.Input
                    className={"flex-1 bg-transparent border-none outline-none"}
                    value={value}
                    onValueChange={changeValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    onBlur={() => {
                        setFocused(false);
                        closeList();
                    }}
                    onFocus={() => {
                        setFocused(true);
                        openList();
                    }}
                    inputElement={
                        <input
                            type="text"
                            ref={inputRef}
                            className={cn(multiAutoCompleteInputVariants({ disabled }))}
                        />
                    }
                />
            </div>
            {endIcon && (
                <InputIcon disabled={disabled} icon={endIcon} inputSize={size} position={"end"} />
            )}
        </div>
    );
};

export { MultiAutoCompleteInput, type MultiAutoCompleteInputProps };
