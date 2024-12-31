import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Description
>;

export const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
    <DialogPrimitive.Description
        className={cn("text-sm text-neutral-strong", className)}
        {...props}
    />
);

DialogDescription.displayName = DialogPrimitive.Description.displayName;
