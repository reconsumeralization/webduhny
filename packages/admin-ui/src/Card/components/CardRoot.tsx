import React from "react";
import { cn, cva, VariantProps } from "~/utils";

const cardRootVariants = cva(
    "wby-flex wby-flex-col wby-bg-neutral-base wby-gap-y-md-plus wby-text-sm",
    {
        variants: {
            padding: {
                standard: "wby-p-lg",
                comfortable: "wby-p-xl",
                compact: "wby-p-md"
            },
            elevation: {
                none: "",
                xs: "wby-shadow-xs",
                sm: "wby-shadow-sm",
                md: "wby-shadow-md",
                lg: "wby-shadow-lg",
                xl: "wby-shadow-xl"
            },
            borderRadius: {
                none: "wby-rounded-none",
                sm: "wby-rounded-sm",
                md: "wby-rounded-md"
            }
        },
        defaultVariants: {
            padding: "standard",
            elevation: "none",
            borderRadius: "md"
        }
    }
);

interface CardRootProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof cardRootVariants> {}

const CardRoot = ({ className, padding, elevation, borderRadius, ...props }: CardRootProps) => (
    <div
        className={cn(cardRootVariants({ padding, elevation, borderRadius }), className)}
        {...props}
    />
);

export { CardRoot, type CardRootProps, cardRootVariants };
