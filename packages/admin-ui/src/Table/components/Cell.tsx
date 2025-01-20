import * as React from "react";
import { cn } from "~/utils";

const Cell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
        className={cn(
            [
                "box-border px-md py-sm-extra text-md text-left align-middle text-neutral-primary",
                "overflow-hidden whitespace-nowrap truncate",
                "[&:has([role=checkbox])]:pl-lg"
            ],
            className
        )}
        {...props}
    />
);

export { Cell };
