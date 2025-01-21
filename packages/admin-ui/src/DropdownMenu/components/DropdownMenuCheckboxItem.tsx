import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";

export interface DropdownMenuItemProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
        "content"
    > {
    content?: React.ReactNode;
}

const DropdownMenuCheckboxItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuItemProps
>(({ className, content, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "group relative cursor-default select-none items-center rounded-sm px-xs-plus outline-none transition-colors",
            "[&_svg]:fill-neutral-xstrong [&_svg]:pointer-events-none [&_svg]:size-md [&_svg]:shrink-0",
            "data-[disabled]:pointer-events-none data-[disabled]:text-neutral-disabled",
            className
        )}
        checked={checked}
        {...props}
    >
        <div
            className={cn(
                "flex min-size-md px-sm py-xs-plus gap-sm-extra items-center text-md rounded-sm group-focus:bg-neutral-dimmed transition-colors",
                { "[&_svg]:fill-neutral-disabled": props.disabled }
            )}
        >
            <DropdownMenuPrimitive.ItemIndicator>
                <Check />
            </DropdownMenuPrimitive.ItemIndicator>
            {!checked && <svg aria-hidden="true" />}
            <span>{content}</span>
        </div>
    </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItemBase.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuCheckboxItem = makeDecoratable(
    "DropdownMenuCheckboxItem",
    DropdownMenuCheckboxItemBase
);
