import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn, withStaticProps } from "~/utils";

type PopoverContentProps = PopoverPrimitive.PopoverContentProps;

const PopoverContent = ({
    className,
    align = "center",
    sideOffset = 6,
    ...props
}: PopoverContentProps) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            align={align}
            sideOffset={sideOffset}
            className={cn(
                [
                    "wby-z-50 wby-rounded-sm wby-overflow-hidden wby-border-sm wby-border-neutral-muted wby-shadow-lg wby-outline-none",
                    "wby-data-[state=open]:animate-in wby-data-[state=closed]:animate-out wby-data-[state=closed]:fade-out-0 wby-data-[state=open]:fade-in-0 wby-data-[state=closed]:zoom-out-95 wby-data-[state=open]:zoom-in-95",
                    "wby-data-[side=bottom]:slide-in-from-top-2 wby-data-[side=left]:slide-in-from-right-2 wby-data-[side=right]:slide-in-from-left-2 wby-data-[side=top]:slide-in-from-bottom-2"
                ],
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
);

const Popover = withStaticProps(PopoverPrimitive.Root, {
    Anchor: PopoverPrimitive.Anchor,
    Content: PopoverContent,
    Portal: PopoverPrimitive.Portal,
    Trigger: PopoverPrimitive.Trigger
});

export { Popover, type PopoverContent };
