import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Description
>;

export const DrawerDescription = ({ className, ...props }: DrawerDescriptionProps) => (
    <DrawerPrimitive.Description
        {...props}
        className={cn("text-sm text-neutral-strong", className)}
    />
);
