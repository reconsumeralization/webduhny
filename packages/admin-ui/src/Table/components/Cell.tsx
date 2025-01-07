import * as React from "react";
import { cn } from "~/utils";

const Cell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
        className={cn(
            "h-[72px] box-border px-lg py-md text-md text-left align-middle text-neutral-primary [&:has([role=checkbox])]:pr-none",
            className
        )}
        {...props}
    />
);

export { Cell };
