import React from "react";
import { cn, cva, VariantProps } from "~/utils";

const resizerVariants = cva(
    [
        "wby-absolute wby-right-0 wby-top-0 wby-w-md wby-h-full wby-border-r-md wby-border-r-accent-default wby-cursor-col-resize wby-select-none wby-touch-none",
        "wby-opacity-0 wby-bg-transparent",
        "hover:wby-opacity-100"
    ],
    {
        variants: {
            isResizing: {
                true: "wby-opacity-100"
            }
        }
    }
);

interface ResizerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof resizerVariants> {}

const Resizer = ({ className, isResizing, ...props }: ResizerProps) => (
    <div className={cn(resizerVariants({ isResizing }), className)} {...props} />
);

export { Resizer, type ResizerProps };
