import * as React from "react";
import { cn, makeDecoratable } from "~/utils";

const DialogFooterBase = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
        {...props}
    />
);
DialogFooterBase.displayName = "DialogFooter";

export const DialogFooter = makeDecoratable("DialogFooter", DialogFooterBase);
