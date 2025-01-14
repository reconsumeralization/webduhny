import * as React from "react";
import { cn } from "~/utils";

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    info?: React.ReactNode;
}

export const DrawerFooter = ({ actions, info, className, ...props }: DrawerFooterProps) => {
    if (!actions && !info) {
        return null;
    }

    return (
        <div {...props} className={cn("w-full flex justify-between pt-md", className)}>
            <div className={"text-sm flex items-center"}>
                <div>{info}</div>
            </div>
            <div className={"flex gap-x-sm"}>{actions}</div>
        </div>
    );
};

DrawerFooter.displayName = "DrawerFooter";
