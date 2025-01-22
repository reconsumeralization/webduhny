import * as React from "react";
import { cn } from "~/utils";

const Head = ({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={cn(
            [
                "box-border relative px-md py-sm text-sm text-left align-middle font-normal text-neutral-strong fill-neutral-xstrong",
                "hover:bg-neutral-subtle",
                "overflow-hidden whitespace-nowrap truncate",
                "[&:has([role=checkbox])]:pl-lg"
            ],
            className
        )}
        {...props}
    >
        {children}
    </th>
);

export { Head };
