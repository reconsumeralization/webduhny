import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "~/utils";
import { Heading } from "~/Heading";

type TitleProps = Omit<ToastPrimitives.ToastTitleProps, "children"> & {
    text: React.ReactNode;
};

const Title = ({ text, className, ...props }: TitleProps) => (
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

export { Title };
