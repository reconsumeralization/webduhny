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
                    "z-50 rounded-sm overflow-hidden border-sm border-neutral-muted shadow-lg outline-none",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
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
