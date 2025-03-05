import React from "react";
import { ReactComponent as EmptyIcon } from "@material-design-icons/svg/outlined/remove.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { cn, cva, Icon as IconComponent, inputVariants, type VariantProps } from "@webiny/admin-ui";
import { IconProvider, IconRenderer } from "~/components/IconPicker/IconRenderer";
import { Icon } from "~/components/IconPicker/types";

const iconPickerTriggerVariants = cva("wby-cursor-pointer fill-neutral-xstrong", {
    variants: {
        size: {
            md: "wby-w-[64px]",
            lg: "wby-w-[64px]",
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

interface IconPickerTriggerProps
    extends VariantProps<typeof inputVariants>,
        VariantProps<typeof iconPickerTriggerVariants> {
    icon: Icon | null;
    disabled?: boolean;
}

const IconPickerTrigger = (props: IconPickerTriggerProps) => {
    return (
        <div
            data-disabled={props.disabled}
            className={cn(
                inputVariants({
                    size: props.size,
                    variant: props.variant,
                    invalid: props.invalid
                }),
                iconPickerTriggerVariants({ size: props.size, disabled: props.disabled })
            )}
        >
            <div className={"wby-flex wby-items-center wby-gap-xs"}>
                <div>
                    {props.icon ? (
                        <IconProvider icon={props.icon} size={24}>
                            <IconComponent icon={<IconRenderer />} label={props.icon.name} />
                        </IconProvider>
                    ) : (
                        <IconComponent icon={<EmptyIcon />} label={"Search icons"} size={"lg"} />
                    )}
                </div>
                <div>
                    <IconComponent size={"sm"} icon={<ChevronDown />} label={"Open list"} />
                </div>
            </div>
        </div>
    );
};

export { IconPickerTrigger, type IconPickerTriggerProps };
