import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
    <DialogPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-neutral-dark/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
