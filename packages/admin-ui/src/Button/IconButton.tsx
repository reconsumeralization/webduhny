import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const iconButtonVariants = cva(
    [
        "border-transparent rounded flex items-center justify-center ring-offset-background transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:border-accent-default"
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-primary fill-neutral-base",
                    "hover:bg-primary-strong",
                    "active:bg-primary-xstrong",
                    "disabled:bg-primary-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                secondary: [
                    "bg-neutral-dimmed [&_svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-muted",
                    "active:bg-neutral-strong",
                    "disabled:bg-neutral-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                tertiary: [
                    "bg-neutral-base border-neutral-muted [&_svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-light",
                    "active:bg-neutral-muted",
                    "disabled:bg-neutral-disabled disabled:border-none",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                ghost: [
                    "[&_svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-dimmed",
                    "active:bg-neutral-muted"
                ],
                "ghost-negative": [
                    "[&_svg]:fill-neutral-base",
                    "hover:bg-neutral-base/20",
                    "active:bg-neutral-base/30",
                    "focus-visible:!border-neutral-base"
                ]
            },
            size: {
                xxs: "border-sm rounded-xs size-sm-extra",
                xs: "border-sm rounded-xs size-md",
                sm: "border-sm rounded-sm p-xs [&_svg]:size-md",
                md: "border-sm rounded-md p-sm [&_svg]:size-md",
                lg: "border-sm rounded-md p-sm-plus [&_svg]:size-md-plus",
                xl: "border-md rounded-lg p-md [&_svg]:size-lg"
            },
            iconSize: {
                default: "",
                lg: ""
            }
        },
        compoundVariants: [
            // When xl/ghost variant is focused, we also show a border.
            {
                size: "xl",
                variant: "ghost",
                className: "focus-visible:border-md"
            },
            // Set the icon size based on the `size` and `iconSize` combination
            // XXS
            {
                size: "xxs",
                iconSize: "default",
                className: "[&_svg]:size-md"
            },
            {
                size: "xxs",
                iconSize: "lg",
                className: "[&_svg]:size-md"
            },
            // XS
            {
                size: "xs",
                iconSize: "default",
                className: "[&_svg]:size-md"
            },
            {
                size: "xs",
                iconSize: "lg",
                className: "[&_svg]:size-md"
            },
            // SM
            {
                size: "sm",
                iconSize: "default",
                className: "[&_svg]:size-md"
            },
            {
                size: "sm",
                iconSize: "lg",
                className: "p-xxs [&_svg]:size-md-plus"
            },
            // MD
            {
                size: "md",
                iconSize: "default",
                className: "[&_svg]:size-md"
            },
            {
                size: "md",
                iconSize: "lg",
                className: "p-xxs [&_svg]:size-md-plus"
            }
        ],
        defaultVariants: {
            variant: "primary",
            size: "md",
            iconSize: "default"
        }
    }
);

interface IconButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
        VariantProps<typeof iconButtonVariants> {
    icon?: React.ReactNode;
    asChild?: boolean;
}

const DecoratableIconButton = ({
    className,
    variant,
    size,
    icon,
    iconSize,
    asChild = false,
    ...props
}: IconButtonProps) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp className={cn(iconButtonVariants({ variant, size, iconSize, className }))} {...props}>
            {icon}
        </Comp>
    );
};

const IconButton = makeDecoratable("IconButton", DecoratableIconButton);

export { IconButton, type IconButtonProps };
