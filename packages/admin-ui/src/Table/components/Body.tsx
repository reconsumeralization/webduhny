import * as React from "react";
import { cn } from "~/utils";

const Body = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("[&_tr:last-child]:wby-border-none", className)} {...props} />
);

export { Body };
