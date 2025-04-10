import React from "react";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

type TextTags = "span" | "div";

const textVariants = cva("wby-font-sans", {
    variants: {
        size: {
            xl: "wby-text-xl",
            lg: "wby-text-lg",
            md: "wby-text-md",
            sm: "wby-text-sm"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    as?: TextTags;
}

const TextBase = ({ children, size, className, as: Tag = "span", ...props }: TextProps) => {
    return (
        <Tag {...props} className={cn(textVariants({ size }), className)}>
            {children}
        </Tag>
    );
};

const Text = makeDecoratable("Text", TextBase);

export { Text, type TextProps, type TextTags };
