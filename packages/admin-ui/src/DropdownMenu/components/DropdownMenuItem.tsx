import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { DropdownMenuSubRoot } from "~/DropdownMenu/components/DropdownMenuSubRoot";
import { DropdownMenuSubTrigger } from "~/DropdownMenu/components/DropdownMenuSubTrigger";
import { DropdownMenuPortal } from "~/DropdownMenu/components/DropdownMenuPortal";
import { DropdownMenuSubContent } from "~/DropdownMenu/components/DropdownMenuSubContent";

export interface DropdownMenuItemProps
    extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, "content"> {
    icon?: React.ReactNode;
    content?: React.ReactNode;
}

const DropdownMenuItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, icon, content, children, ...props }, ref) => {
    if (children) {
        return (
            <DropdownMenuSubRoot>
                <DropdownMenuSubTrigger>
                    {icon}
                    <span>{content}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>{children}</DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSubRoot>
        );
    }

    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "wby-group wby-relative wby-cursor-default wby-select-none wby-items-center wby-rounded-sm wby-px-xs-plus wby-outline-none wby-transition-colors",
                "[&_svg]:wby-fill-neutral-xstrong [&_svg]:wby-pointer-events-none [&_svg]:wby-size-md [&_svg]:wby-shrink-0",
                "data-[disabled]:wby-pointer-events-none data-[disabled]:wby-text-neutral-disabled",
                className
            )}
            {...props}
        >
            {icon}
            <span>{content}</span>
        </DropdownMenuPrimitive.Item>
    );
});

DropdownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuItem = makeDecoratable("DropdownMenuItem", DropdownMenuItemBase);
