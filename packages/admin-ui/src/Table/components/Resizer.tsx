import React from "react";
import { cn, cva, VariantProps } from "~/utils";

const resizerVariants = cva(
    [
        "absolute right-0 top-0 w-xxs h-full cursor-col-resize select-none touch-none",
        "opacity-0 bg-primary-default",
        "group-hover:opacity-100"
    ],
    {
        variants: {
            isResizing: {
                true: "bg-primary-default opacity-100"
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

export { Resizer, ResizerProps };
