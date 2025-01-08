import * as React from "react";
import { cn } from "~/utils";

const Cell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
        className={cn(
            "box-border px-lg py-md text-md text-left align-middle text-neutral-primary",
            className
        )}
        {...props}
    />
);

export { Cell };
