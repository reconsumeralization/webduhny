import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-neutral-dark/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
