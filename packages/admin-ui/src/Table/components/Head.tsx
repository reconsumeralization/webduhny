import * as React from "react";
import { cn } from "~/utils";

const Head = ({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={cn(
            [
                "wby-box-border wby-relative wby-px-md wby-py-sm wby-text-sm wby-text-left wby-align-middle wby-font-normal wby-text-neutral-strong wby-fill-neutral-xstrong",
                "hover:wby-bg-neutral-subtle",
                "wby-overflow-hidden wby-whitespace-nowrap wby-truncate",
                "[&:has([role=checkbox])]:wby-pl-lg"
            ],
            className
        )}
        {...props}
    >
        {children}
    </th>
);

export { Head };
