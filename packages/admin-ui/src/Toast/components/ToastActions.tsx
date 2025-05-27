import React from "react";
import { cn, makeDecoratable } from "~/utils";

const DecoratableToastActions = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        {...props}
        className={cn(
            "wby-flex wby-w-full wby-items-center wby-justify-start wby-gap-sm wby-mt-md",
            className
        )}
    >
        {children}
    </div>
);

const ToastActions = makeDecoratable("ToastActions", DecoratableToastActions);

export { ToastActions };
