import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, makeDecoratable } from "~/utils";

const DialogTitleBase = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
DialogTitleBase.displayName = DialogPrimitive.Title.displayName;

export const DialogTitle = makeDecoratable("DialogTitle", DialogTitleBase);
