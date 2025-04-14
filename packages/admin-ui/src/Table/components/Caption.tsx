import * as React from "react";
import { cn } from "~/utils";

const Caption = ({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) => (
    <caption
        className={cn("wby-mt-4 wby-text-sm wby-text-muted-foreground", className)}
        {...props}
    />
);

export { Caption };
