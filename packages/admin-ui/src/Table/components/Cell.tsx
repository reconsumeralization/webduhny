import * as React from "react";
import { cn } from "~/utils";

const Cell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
        className={cn(
            [
                "wby-box-border wby-px-md wby-py-sm-extra wby-text-md wby-text-left wby-align-middle wby-text-neutral-primary",
                "wby-overflow-hidden wby-whitespace-nowrap wby-truncate",
                "[&:has([role=checkbox])]:wby-pl-lg"
            ],
            className
        )}
        {...props}
    />
);

export { Cell };
