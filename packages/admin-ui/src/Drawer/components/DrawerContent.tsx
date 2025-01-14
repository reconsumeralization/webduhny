import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { cn, cva, VariantProps } from "~/utils";
import { IconButton } from "~/Button";

export interface DrawerContentProps
    extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
        VariantProps<typeof drawerVariants> {
    showCloseButton?: boolean;
    width?: string;
}

const drawerVariants = cva(
    [
        "fixed z-50 gap-4 bg-neutral-base py-md pl-lg pr-md text-md text-neutral-strong focus-visible:outline-none",
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
        {/* We needed to add this wrapper so that absolute-positioned elements can be placed */}
        {/* inside the dialog. We noticed this while showing a loader inside the dialog. */}
        <div className={"relative flex flex-col justify-between h-full"}>
            {showCloseButton !== false && (
                <DrawerPrimitive.Close asChild className="absolute right-0 top-0">
                    <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                </DrawerPrimitive.Close>
            )}
            {children}
        </div>
    </DrawerPrimitive.Content>
));

DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export { DrawerContent };
