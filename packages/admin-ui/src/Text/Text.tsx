import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";

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
    text: React.ReactNode;
}

const TextBase = ({ size, text, className, as: Tag = "span" }: TextProps) => {
    return <Tag className={cn(textVariants({ size, className }))}>{text}</Tag>;
};

const Text = makeDecoratable("Text", TextBase);

export { Text, type TextProps, type TextTags };
