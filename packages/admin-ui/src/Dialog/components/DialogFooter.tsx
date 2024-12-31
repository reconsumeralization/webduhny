import * as React from "react";
import { cn } from "~/utils";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    info?: React.ReactNode;
}

export const DialogFooter = ({ actions, info, className, ...props }: DialogFooterProps) => {
    if (!actions && !info) {
        return null;
    }

    return (
        <div {...props} className={cn("flex justify-between", className)}>
            <div>{info}</div>
            <div className={"flex gap-x-sm"}>{actions}</div>
        </div>
    );
};

DialogFooter.displayName = "DialogFooter";
