import * as React from "react";
import { cn } from "~/utils";
import { Separator } from "~/Separator";
import type { DrawerProps } from "~/Drawer";

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode;
    info?: React.ReactNode;
    separator?: DrawerProps["footerSeparator"];
}

export const DrawerFooter = ({
    actions,
    info,
    className,
    separator,
    ...props
}: DrawerFooterProps) => {
    if (!actions && !info) {
        return null;
    }

    return (
        <>
            {separator && <Separator variant={"dimmed"} margin={"none"} />}
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
        </>
    );
};
