import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, makeDecoratable } from "~/utils";

const DialogDescriptionBase = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-neutral-strong", className)}
        {...props}
    />
));
DialogDescriptionBase.displayName = DialogPrimitive.Description.displayName;

export const DialogDescription = makeDecoratable("DialogDescription", DialogDescriptionBase);
