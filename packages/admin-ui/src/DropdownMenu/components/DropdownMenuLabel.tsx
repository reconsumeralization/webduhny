import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";

export interface DropdownMenuLabelProps
    extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>, "content"> {
    content: React.ReactNode;
}

const DropdownMenuLabelBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
>(({ className, content, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
            "wby-py-sm wby-pl-sm-extra wby-pr-md wby-text-sm wby-uppercase wby-text-neutral-strong wby-font-semibold",
            className
        )}
        {...props}
    >
        {content}
    </DropdownMenuPrimitive.Label>
));
DropdownMenuLabelBase.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuLabel = makeDecoratable("DropdownMenuLabel", DropdownMenuLabelBase);
