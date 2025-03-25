import React, { useEffect, useRef } from "react";
import { InputPrimitiveProps, inputVariants } from "~/Input";
import { PopoverPrimitive } from "~/Popover";
import { cn, cva, type VariantProps } from "~/utils";
import { IconPickerGrid, IconPickerInput, IconPickerTrigger } from "./components";
import { IconPickerIconDto } from "../domains";
import { useIconPicker } from "./useIconPicker";

const iconPickerVariants = cva("wby-cursor-pointer wby-text-neutral-strong", {
    variants: {
        size: {
            md: "wby-w-16",
            lg: "wby-w-16",
            xl: "wby-w-20"
        },
        disabled: {
            true: "wby-pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface IconPickerPrimitiveProps extends VariantProps<typeof iconPickerVariants> {
    /**
     * Indicates if the field is disabled.
     */
    disabled?: boolean;
    /**
     * Callback triggered when the value changes.
     */
    onChange?: (value: string) => void;
    /**
     * List of icons to be displayed in the icon picker.
     */
    icons: IconPickerIconDto[];
    /**
     * Indicates if the input field is invalid.
     * Refer to `InputPrimitiveProps["invalid"]` for possible values.
     */
    invalid?: InputPrimitiveProps["invalid"];
    /**
     * Optional selected icon.
     */
    value?: string;
    /**
     * Variant of the input field.
     * Refer to `InputPrimitiveProps["variant"]` for possible values.
     */
    variant?: InputPrimitiveProps["variant"];
}

const IconPickerPrimitive = (props: IconPickerPrimitiveProps) => {
    const { vm, setListOpenState, searchIcon, setSelectedIcon } = useIconPicker(props);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (vm.open && inputRef.current) {
                inputRef.current.focus();
            }
        }, 50);
    }, [vm.open]);

    return (
        <PopoverPrimitive open={vm.open} onOpenChange={setListOpenState}>
            <PopoverPrimitive.Trigger asChild>
                <button
                    data-disabled={props.disabled}
                    className={cn(
                        inputVariants({
                            size: props.size,
                            variant: props.variant,
                            invalid: props.invalid
                        }),
                        iconPickerVariants({ size: props.size, disabled: props.disabled })
                    )}
                >
                    <IconPickerTrigger value={props.value} size={props.size} />
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content
                align={"start"}
                className={"wby-min-w-96"}
                onWheel={e => e.stopPropagation()} // Wheel event should not propagate to the parent: this fixes scrolling issues when the IconPicker is placed inside a Dialog.
            >
                <IconPickerInput value={vm.searchQuery} onChange={searchIcon} inputRef={inputRef} />
                <IconPickerGrid
                    icons={vm.icons}
                    iconsLength={vm.iconsLength}
                    onIconSelect={setSelectedIcon}
                />
            </PopoverPrimitive.Content>
        </PopoverPrimitive>
    );
};

export { IconPickerPrimitive, type IconPickerPrimitiveProps };
