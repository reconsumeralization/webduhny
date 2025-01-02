import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;

export const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
    <SheetPrimitive.Title {...props} className={cn("text-h4", className)} />
);

SheetTitle.displayName = SheetPrimitive.Title.displayName;
