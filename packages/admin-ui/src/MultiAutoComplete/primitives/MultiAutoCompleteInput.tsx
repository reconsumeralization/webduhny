import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { getIconPosition, InputIcon, InputPrimitiveProps, inputVariants } from "~/Input";
import { CommandInput, CommandOptionFormatted } from "~/Command";
import { Tag } from "~/Tag";
import { Icon } from "~/Icon";
import { cn, cva, VariantProps } from "~/utils";

const multiAutoCompleteInputVariants = cva("relative", {
    variants: {
        disabled: {
            true: "cursor-not-allowed"
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
    selectedOptions,
    size,
    startIcon,
    value,
    variant,
    className,
    ...props
}: MultiAutoCompleteInputProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const iconPosition = getIconPosition(startIcon, endIcon);

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
            }}
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
                {selectedOptions.map(option => {
                    return (
                        <Tag
                            key={option.value}
                            variant={"neutral-light"}
                            label={option.label}
                            icon={
                                <Icon
                                    label={"Remove option"}
                                    icon={<Close />}
                                    onClick={() => removeSelectedOption(option.value)}
                                />
                            }
                        />
                    );
                })}
                <CommandInput
                    className={"flex-sm bg-transparent border-none outline-none"}
                    value={value}
                    onValueChange={changeValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    onBlur={closeList}
                    onFocus={openList}
                    inputElement={<input type="text" ref={inputRef} />}
                />
            </div>
            {endIcon && (
                <InputIcon disabled={disabled} icon={endIcon} inputSize={size} position={"end"} />
            )}
        </div>
    );
};

export { MultiAutoCompleteInput };
