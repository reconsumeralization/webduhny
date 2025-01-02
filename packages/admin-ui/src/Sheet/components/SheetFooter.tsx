import * as React from "react";
import { cn } from "~/utils";

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    info?: React.ReactNode;
}

export const SheetFooter = ({ actions, info, className, ...props }: SheetFooterProps) => {
    if (!actions && !info) {
        return null;
    }

    return (
        <div {...props} className={cn("flex justify-between", className)}>
            <div className={"text-sm flex items-center"}>
                <div>{info}</div>
            </div>
            <div className={"flex gap-x-sm"}>{actions}</div>
        </div>
    );
};

SheetFooter.displayName = "SheetFooter";
