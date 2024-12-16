import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, makeDecoratable } from "~/utils";

const DialogOverlayBase = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-neutral-dark/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));

DialogOverlayBase.displayName = DialogPrimitive.Overlay.displayName;

export const DialogOverlay = makeDecoratable("DialogOverlay", DialogOverlayBase);
