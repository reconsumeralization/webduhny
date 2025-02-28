import React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const toastRootVariants = cva(
    "wby-group wby-pointer-events-auto wby-relative wby-flex wby-w-full wby-items-center wby-justify-start wby-p-md wby-gap-sm-extra wby-self-stretch wby-overflow-hidden wby-rounded-md wby-border-sm wby-border-neutral-dimmed wby-shadow-lg",
    {
        variants: {
            variant: {
                default: "wby-default-variant wby-bg-neutral-dark",
                subtle: "wby-subtle-variant wby-bg-white"
            },
            hasDescription: {
                true: "wby-has-description wby-items-start wby-justify-start"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

type ToastRootProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastRootVariants>;

const ToastRoot = ({ className, hasDescription, variant, children, ...props }: ToastRootProps) => {
    return (
        <div className={cn(toastRootVariants({ variant, hasDescription }), className)} {...props}>
            {children}
        </div>
    );
};

export { ToastRoot, type ToastRootProps, toastRootVariants };
