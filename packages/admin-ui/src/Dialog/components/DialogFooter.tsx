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
        <div {...props} className={cn("flex justify-between p-lg pt-md-extra", className)}>
            {info && (
                <div className={"text-sm flex items-center"}>
                    <div>{info}</div>
                </div>
            )}
            {actions && <div className={"flex gap-x-sm ml-auto"}>{actions}</div>}
        </div>
    );
};
