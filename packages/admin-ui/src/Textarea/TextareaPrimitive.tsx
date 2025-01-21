import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const textareaVariants = cva(
    [
        "wby-flex wby-min-h-[80px] wby-w-full wby-border-sm wby-text-md wby-focus-visible:outline-none wby-disabled:cursor-not-allowed"
    ],
    {
        variants: {
            variant: {
                primary: [
                    "wby-bg-neutral-base wby-border-neutral-muted wby-text-neutral-strong wby-placeholder:text-neutral-dimmed",
                    "wby-hover:border-neutral-strong",
                    "wby-focus:border-neutral-black",
                    "wby-disabled:bg-neutral-disabled wby-disabled:border-neutral-dimmed wby-disabled:text-neutral-disabled wby-disabled:placeholder:text-neutral-disabled"
                ],
                secondary: [
                    "wby-bg-neutral-light wby-border-neutral-subtle wby-text-neutral-strong wby-placeholder:text-neutral-dimmed",
                    "wby-hover:bg-neutral-dimmed",
                    "wby-focus:bg-neutral-base wby-focus:border-neutral-black",
                    "wby-disabled:bg-neutral-disabled wby-disabled:text-neutral-disabled wby-disabled:placeholder:text-neutral-disabled"
                ],
                ghost: [
                    "wby-bg-transparent wby-border-transparent wby-text-neutral-strong wby-placeholder:text-neutral-dimmed",
                    "wby-hover:bg-neutral-dimmed/95",
                    "wby-focus:bg-neutral-base wby-focus:border-neutral-black",
                    "wby-disabled:bg-transparent wby-disabled:text-neutral-disabled wby-disabled:placeholder:text-neutral-disabled"
                ]
            },
            size: {
                md: ["wby-px-sm-extra wby-py-xs-plus wby-rounded-md"],
                lg: ["wby-px-sm-extra wby-py-sm-plus wby-rounded-md"],
                xl: ["wby-px-md-extra wby-p-md wby-rounded-lg"]
            },
            invalid: {
                true: [
                    "wby-border-destructive-default",
                    "wby-hover:border-destructive-default",
                    "wby-focus:border-destructive-default",
                    "wby-disabled:border-destructive-default"
                ]
            }
        },
        compoundVariants: [
            // Add specific classNames in case of invalid `ghost` textarea.
            {
                variant: "ghost",
                invalid: true,
                class: [
                    "wby-border-destructive-subtle wby-bg-destructive-subtle",
                    "wby-hover:border-destructive-subtle wby-hover:bg-destructive-subtle",
                    "wby-focus:border-destructive-subtle wby-focus:bg-destructive-subtle",
                    "wby-disabled:bg-destructive-subtle wby-disabled:border-destructive-subtle"
                ]
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
