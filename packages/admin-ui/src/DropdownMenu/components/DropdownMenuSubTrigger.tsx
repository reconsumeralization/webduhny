import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "~/utils";
import { ReactComponent as ChevronRight } from "@material-design-icons/svg/filled/chevron_right.svg";

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "wby-group wby-flex wby-cursor-default wby-select-none wby-items-center wby-rounded-sm wby-px-xs-plus wby-text-md wby-outline-none",
            className
        )}
        {...props}
    >
        <div
            className={cn(
                "wby-rounded-sm wby-gap-sm-extra group-focus:wby-bg-neutral-dimmed wby-flex wby-items-center wby-w-full wby-px-sm wby-py-xs-plus wby-transition-colors",
                "[&_svg]:wby-pointer-events-none [&_svg]:wby-size-md [&_svg]:wby-shrink-0 [&_svg]:wby-fill-neutral-xstrong"
            )}
        >
            {children}
            <ChevronRight className="wby-ml-auto" />
        </div>
    </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export { DropdownMenuSubTrigger };
