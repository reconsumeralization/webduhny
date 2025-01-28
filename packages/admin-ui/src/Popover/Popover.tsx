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
                    "data-[state=open]:wby-animate-in data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out-0 data-[state=open]:wby-fade-in-0 data-[state=closed]:wby-zoom-out-95 data-[state=open]:wby-zoom-in-95",
                    "data-[side=bottom]:wby-slide-in-from-top-2 data-[side=left]:wby-slide-in-from-right-2 data-[side=right]:wby-slide-in-from-left-2 data-[side=top]:wby-slide-in-from-bottom-2"
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
    Trigger: PopoverPrimitive.Trigger
});

export { Popover, type PopoverContent };
