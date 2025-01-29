import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "~/utils";
import { Text } from "~/Text";

type DescriptionProps = Omit<ToastPrimitives.ToastDescriptionProps, "children"> & {
    text: React.ReactNode;
};

const Description = ({ text, className, ...props }: DescriptionProps) => (
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

export { Description };
