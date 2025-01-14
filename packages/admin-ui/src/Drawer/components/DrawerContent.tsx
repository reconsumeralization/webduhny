import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn, cva, VariantProps } from "~/utils";

export interface DrawerContentProps
    extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
        VariantProps<typeof drawerVariants> {
    showCloseButton?: boolean;
    width?: string;
}

const drawerVariants = cva(
    [
        "fixed z-50 gap-4 bg-neutral-base text-md text-neutral-strong focus-visible:outline-none shadow-lg",
        "transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"
    ],
    {
        variants: {
            side: {
                left: [
                    "inset-y-0 left-0 h-full w-[400px]",
                    "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
                ],
                right: [
                    "inset-y-0 right-0 h-full w-[400px]",
                    "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
                ]
            }
        },
        defaultVariants: {
            side: "right"
        }
    }
);

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Content>,
    DrawerContentProps
>(({ side = "right", className, style = {}, children, showCloseButton, ...props }, ref) => (
    <DrawerPrimitive.Content
        ref={ref}
        {...props}
        className={cn(drawerVariants({ side }), className)}
        style={{ width: props.width, ...style }}
    >
        <div className={"flex flex-col justify-between h-full"}>{children}</div>
    </DrawerPrimitive.Content>
));

DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export { DrawerContent };
