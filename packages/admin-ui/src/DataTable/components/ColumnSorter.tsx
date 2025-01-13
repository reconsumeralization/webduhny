import React from "react";
import { cn, cva, VariantProps } from "~/utils";

const columnSorterVariants = cva("flex items-center gap-xxs cursor-auto", {
    variants: {
        sortable: {
            true: "cursor-pointer"
        }
    }
});

interface ColumnSorterProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof columnSorterVariants> {}

const ColumnSorter = ({ className, children, sortable, ...props }: ColumnSorterProps) => {
    return (
        <div {...props} className={cn(columnSorterVariants({ sortable }), className)}>
            {children}
        </div>
    );
};

export { ColumnSorter };
