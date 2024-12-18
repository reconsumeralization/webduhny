import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const iconButtonVariants = cva(
    [
        "border-transparent rounded flex items-center justify-center ring-offset-background transition-colors [&_svg]pointer-events-none [&_svg]:shrink-0",
        "disabled:cursor-not-allowed",
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
                    "bg-neutral-dimmed fill-neutral-xstrong",
                    "hover:bg-neutral-muted",
                    "active:bg-neutral-strong",
                    "disabled:bg-neutral-disabled fill-neutral-strong",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                tertiary: [
                    "bg-neutral-base border-neutral-muted fill-neutral-xstrong",
                    "hover:bg-neutral-light",
                    "active:bg-neutral-muted",
                    "disabled:bg-neutral-disabled fill-neutral-strong disabled:border-none",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                ghost: [
                    "fill-neutral-xstrong",
                    "hover:bg-neutral-dimmed",
                    "active:bg-neutral-muted",
                    "disabled:fill-neutral-strong hover:disabled:bg-transparent active:disabled:bg-transparent"
                ],
                "ghost-negative": [
                    "fill-neutral-base",
                    "hover:bg-neutral-base/20",
                    "active:bg-neutral-base/30",
                    "focus-visible:!border-neutral-base",
                    "disabled:fill-neutral-base disabled:opacity-50 hover:disabled:bg-transparent active:disabled:bg-transparent"
                ]
            },
            size: {
                xxs: "border-sm rounded-xs size-sm-extra [&_svg]:size-md",
                xs: "border-sm rounded-xs size-md [&_svg]:size-md",
                sm: "border-sm rounded-sm",
                md: "border-sm rounded-md",
                lg: "border-sm rounded-md",
                xl: "border-md rounded-lg p-[calc(theme(padding.md)-theme(borderWidth.md))] [&_svg]:size-lg"
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
            // SM
            {
                size: "sm",
                iconSize: "default",
                className: "p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&_svg]:size-md"
            },
            {
                size: "sm",
                iconSize: "lg",
                className: "p-[calc(theme(padding.xxs)-theme(borderWidth.sm))] [&_svg]:size-md-plus"
            },
            // MD
            {
                size: "md",
                iconSize: "default",
                className: "p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&_svg]:size-md"
            },
            {
                size: "md",
                iconSize: "lg",
                className: "p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&_svg]:size-lg"
            },
            // LG
            {
                size: "lg",
                iconSize: "default",
                className:
                    "p-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] [&_svg]:size-md-plus"
            },
            {
                size: "lg",
                iconSize: "lg",
                className: "p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&_svg]:size-lg"
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
        <Comp className={cn(iconButtonVariants({ variant, size, iconSize }), className)} {...props}>
            {icon}
        </Comp>
    );
};

const IconButton = makeDecoratable("IconButton", DecoratableIconButton);

export { IconButton, type IconButtonProps, iconButtonVariants };
