import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const textareaVariants = cva(
    [
        "flex min-h-[80px] w-full border-sm text-md focus-visible:outline-none disabled:cursor-not-allowed"
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-neutral-base border-neutral-muted text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:border-neutral-strong",
                    "focus:border-neutral-black",
                    "disabled:bg-neutral-disabled disabled:border-neutral-dimmed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ],
                secondary: [
                    "bg-neutral-light border-neutral-subtle text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:bg-neutral-dimmed",
                    "focus:bg-neutral-base focus:border-neutral-black",
                    "disabled:bg-neutral-disabled disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ],
                ghost: [
                    "bg-transparent border-transparent text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:bg-neutral-dimmed/95",
                    "focus:bg-neutral-base focus:border-neutral-black",
                    "disabled:bg-transparent disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ]
            },
            size: {
                md: ["px-sm-extra py-xs-plus rounded-md"],
                lg: ["px-sm-extra py-sm-plus rounded-md"],
                xl: ["px-md-extra p-md rounded-lg"]
            },
            invalid: {
                true: ""
            }
        },
        compoundVariants: [
            // Add specific classNames in case of invalid textarea: note the difference between the ghost and the other variants.
            {
                variant: "primary",
                invalid: true,
                class: "!border-destructive-default"
            },
            {
                variant: "secondary",
                invalid: true,
                class: "!border-destructive-default"
            },
            {
                variant: "ghost",
                invalid: true,
                class: "!border-destructive-subtle !bg-destructive-subtle"
            }
        ],
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);

interface TextareaPrimitiveProps
    extends React.ComponentProps<"textarea">,
        VariantProps<typeof textareaVariants> {
    textareaRef?: React.Ref<HTMLTextAreaElement>;
}

const TextareaPrimitive = ({
    className,
    variant,
    invalid,
    size,
    textareaRef,
    ...props
}: TextareaPrimitiveProps) => {
    return (
        <textarea
            ref={textareaRef}
            className={cn(textareaVariants({ variant, invalid, size }), className)}
            {...props}
        />
    );
};

export { TextareaPrimitive, type TextareaPrimitiveProps };
