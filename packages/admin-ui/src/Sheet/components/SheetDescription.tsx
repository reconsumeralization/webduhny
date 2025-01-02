import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type SheetDescriptionProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Description
>;

export const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
    <SheetPrimitive.Description
        {...props}
        className={cn("text-sm text-neutral-strong", className)}
    />
);

SheetDescription.displayName = SheetPrimitive.Description.displayName;
