import React from "react";
import { SketchPicker } from "react-color";
import { useColorPicker } from "./useColorPicker";
import { inputVariants } from "~/Input";
import { PopoverPrimitive, type PopoverPrimitiveContentProps } from "~/Popover";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const colorPickerVariants = cva("wby-cursor-pointer", {
    variants: {
        size: {
            md: ["wby-size-8", "wby-p-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] "],
            lg: ["wby-size-10", "wby-p-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))]"],
            xl: ["wby-size-14", "wby-p-[calc(theme(padding.md)-theme(borderWidth.sm))]"]
        },
        disabled: {
            true: "wby-pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface ColorPickerPrimitiveProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof inputVariants> {
    /**
     * Callback triggered when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Callback triggered when the value changes.
     */
    onValueChange: (value: string) => void;
    /**
     * Optional selected value.
     */
    value?: string;
    /**
     * If true, the color picker will be disabled.
     */
    disabled?: boolean;
    /**
     * Popover alignment.
     */
    align?: PopoverPrimitiveContentProps["align"];
}

const DecoratableColorPickerPrimitive = ({
    align,
    className,
    disabled,
    invalid,
    size,
    variant,
    ...props
}: ColorPickerPrimitiveProps) => {
    const { vm, setColor, setOpen } = useColorPicker(props);

    return (
        <div className={className}>
            <PopoverPrimitive open={vm.open}>
                <PopoverPrimitive.Trigger asChild>
                    <div
                        onClick={() => setOpen(!vm.open)}
                        data-disabled={disabled}
                        className={cn(
                            inputVariants({
                                size,
                                variant,
                                invalid
                            }),
                            colorPickerVariants({ size, disabled })
                        )}
                    >
                        <div
                            className={"wby-rounded-xs wby-size-full"}
                            style={{ backgroundColor: vm.value }}
                        />
                    </div>
                </PopoverPrimitive.Trigger>
                <PopoverPrimitive.Content
                    align={align}
                    onEscapeKeyDown={() => setOpen(false)}
                    onInteractOutside={() => setOpen(false)}
                >
                    <SketchPicker color={vm.value} onChange={setColor} />
                </PopoverPrimitive.Content>
            </PopoverPrimitive>
        </div>
    );
};

const ColorPickerPrimitive = makeDecoratable(
    "ColorPickerPrimitive",
    DecoratableColorPickerPrimitive
);

export { ColorPickerPrimitive, type ColorPickerPrimitiveProps };
