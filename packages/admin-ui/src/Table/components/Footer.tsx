import * as React from "react";
import { cn } from "~/utils";

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tfoot
        className={cn(
            "wby-border-t wby-bg-muted/50 wby-font-medium [&>tr]:last:wby-border-b-0",
            className
        )}
        {...props}
    />
);

export { Footer };
