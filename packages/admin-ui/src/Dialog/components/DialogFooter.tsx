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
        <div
            {...props}
            className={cn("wby-flex wby-justify-between wby-p-lg wby-pt-md-extra", className)}
        >
            {info && (
                <div className={"wby-text-sm wby-flex wby-items-center"}>
                    <div>{info}</div>
                </div>
            )}
            {actions && <div className={"wby-flex wby-gap-x-sm wby-ml-auto"}>{actions}</div>}
        </div>
    );
};
