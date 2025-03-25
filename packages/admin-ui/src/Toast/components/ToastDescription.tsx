import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { Text } from "~/Text";

type DescriptionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastDescription = ({ text, className, ...props }: DescriptionProps) => (
    <div
        {...props}
        className={cn(
            "wby-mt-xs-plus group-[.wby-default-variant]:wby-text-neutral-dimmed group-[.wby-subtle-variant]:wby-text-neutral-strong",
            className
        )}
    >
        <Text as={"div"} size={"md"} className={"wby-text-neutral-dimmed"}>
            {text}
        </Text>
    </div>
);

const ToastDescription = makeDecoratable("ToastDescription", DecoratableToastDescription);

export { ToastDescription, type DescriptionProps };
