import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn, makeDecoratable } from "~/utils";
import { Heading } from "~/Heading";

type ToastTitleProps = Omit<ToastPrimitives.ToastTitleProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastTitle = ({ text, className, ...props }: ToastTitleProps) => (
    <ToastPrimitives.Title
        {...props}
        asChild
        className={cn(
            "group-[.wby-default-variant]:wby-text-neutral-light group-[.wby-subtle-variant]:wby-text-neutral-primary wby-font-normal group-[.wby-has-description]:wby-font-semibold",
            className
        )}
    >
        <Heading level={6} text={text} />
    </ToastPrimitives.Title>
);

const ToastTitle = makeDecoratable("ToastTitle", DecoratableToastTitle);

export { ToastTitle, type ToastTitleProps };
