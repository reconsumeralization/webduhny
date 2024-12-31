import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
    <DialogPrimitive.Title className={cn("text-h4", className)} {...props} />
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;
