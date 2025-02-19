import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn, makeDecoratable } from "~/utils";
import { Text } from "~/Text";

type ToastDescriptionProps = Omit<ToastPrimitives.ToastDescriptionProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastDescription = ({ text, className, ...props }: ToastDescriptionProps) => (
    <ToastPrimitives.Description
        {...props}
        asChild
        className={cn(
            "wby-mt-xs-plus group-[.wby-default-variant]:wby-text-neutral-dimmed group-[.wby-subtle-variant]:wby-text-neutral-strong",
            className
        )}
    >
        <Text text={text} as={"div"} size={"md"} className={"wby-text-neutral-dimmed"} />
    </ToastPrimitives.Description>
);

const ToastDescription = makeDecoratable("ToastDescription", DecoratableToastDescription);

export { ToastDescription };
