import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, makeDecoratable } from "~/utils";

type AvatarFallbackProps = AvatarPrimitive.AvatarFallbackProps;

const AvatarFallbackBase = ({ className, ...props }: AvatarFallbackProps) => (
    <AvatarPrimitive.Fallback
        className={cn(
            "wby-flex wby-h-full wby-w-full wby-items-center wby-justify-center wby-rounded-sm",
            className
        )}
        {...props}
    />
);

const AvatarFallback = makeDecoratable("AvatarFallback", AvatarFallbackBase);

export { AvatarFallback, type AvatarFallbackProps };
