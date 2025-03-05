import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn, cva, type VariantProps } from "~/utils";

const rootVariants = cva(
    [
        "wby-group wby-pointer-events-auto wby-relative wby-flex wby-w-full wby-items-center wby-justify-start wby-p-md wby-gap-sm-extra wby-self-stretch wby-overflow-hidden wby-rounded-md wby-border-sm wby-border-neutral-dimmed wby-shadow-lg wby-transition-all",
        "data-[swipe=cancel]:wby-translate-x-0 data-[swipe=end]:wby-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:wby-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:wby-transition-none data-[state=open]:wby-animate-in data-[state=closed]:wby-animate-out data-[swipe=end]:wby-animate-out data-[state=closed]:wby-fade-out-80 data-[state=closed]:wby-slide-out-to-right-full data-[state=open]:wby-slide-in-from-top-full"
    ],
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

type RootProps = ToastPrimitives.ToastProps & VariantProps<typeof rootVariants>;

const ToastRoot = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, RootProps>(
    ({ className, hasDescription, variant, ...props }, ref) => {
        return (
            <ToastPrimitives.Root
                ref={ref}
                className={cn(rootVariants({ variant, hasDescription }), className)}
                {...props}
            />
        );
    }
);
ToastRoot.displayName = ToastPrimitives.Root.displayName;

export { ToastRoot, rootVariants };
