import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { Heading } from "~/Heading";

type ToastTitleProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastTitle = ({ text, className, ...props }: ToastTitleProps) => (
    <div
        {...props}
        className={cn(
            "group-[.wby-default-variant]:wby-text-neutral-light group-[.wby-subtle-variant]:wby-text-neutral-primary wby-font-normal group-[.wby-has-description]:wby-font-semibold",
            className
        )}
    >
        <Heading level={6}>{text}</Heading>
    </div>
);

const ToastTitle = makeDecoratable("ToastTitle", DecoratableToastTitle);

export { ToastTitle, type ToastTitleProps };
