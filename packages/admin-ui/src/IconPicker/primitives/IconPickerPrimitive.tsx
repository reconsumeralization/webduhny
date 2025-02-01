import React, { useEffect, useRef } from "react";
import { inputVariants } from "~/Input";
import { Popover } from "~/Popover";
import { cn, cva, type VariantProps } from "~/utils";
import { IconPickerGrid, IconPickerInput, IconPickerTrigger } from "./components";
import { IconDto } from "./domains";
import { useIconPicker } from "./useIconPicker";

const iconPickerVariants = cva("wby-cursor-pointer wby-text-neutral-strong", {
    variants: {
        size: {
            md: "wby-w-[64px]",
            lg: "wby-w-[68px]",
            xl: "wby-w-[76px]"
        },
        disabled: {
            true: "wby-pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface IconPickerPrimitiveProps
    extends VariantProps<typeof iconPickerVariants>,
        VariantProps<typeof inputVariants> {
    value?: string;
    onChange?: (value: string) => void;
    icons: IconDto[];
    disabled?: boolean;
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
        <Popover open={vm.open} onOpenChange={setListOpenState}>
            <Popover.Trigger asChild>
                <div
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
                </div>
            </Popover.Trigger>
            <Popover.Content align={"start"} className={`wby-min-w-96 wby-bg-white`}>
                <IconPickerInput value={vm.searchQuery} onChange={searchIcon} inputRef={inputRef} />
                <IconPickerGrid
                    icons={vm.icons}
                    iconsLength={vm.iconsLength}
                    onIconSelect={setSelectedIcon}
                />
            </Popover.Content>
        </Popover>
    );
};

export { IconPickerPrimitive, type IconPickerPrimitiveProps };
