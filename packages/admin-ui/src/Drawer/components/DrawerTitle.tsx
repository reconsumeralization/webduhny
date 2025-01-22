import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
    <DrawerPrimitive.Title {...props} className={cn("text-h4 flex gap-sm", className)} />
);
