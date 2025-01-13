import * as React from "react";
import { cn } from "~/utils";

const Head = ({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={cn(
            "group relative px-lg py-sm-extra text-sm text-left align-middle font-semibold text-neutral-strong fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        {children}
    </th>
);

export { Head };
