import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { cn, cva, VariantProps } from "~/utils";
import { IconButton } from "~/Button";

export interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {
    showCloseButton?: boolean;
    width?: string;
}

const sheetVariants = cva(
    [
        "fixed z-50 gap-4 bg-neutral-base pt-md-extra pb-lg px-lg shadow-lg text-md text-neutral-strong",
        "transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"
    ],
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-[400px] border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
                right: "inset-y-0 right-0 h-full w-[400px] border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
            }
        },
        defaultVariants: {
            side: "right"
        }
    }
);

const SheetContent = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Content>,
    SheetContentProps
>(({ side = "right", className, style = {}, children, showCloseButton, ...props }, ref) => (
    <SheetPrimitive.Content
        ref={ref}
        {...props}
        className={cn(sheetVariants({ side }), className)}
        style={{ width: props.width, ...style }}
        /*    className={cn(
                " w-full max-w-lg bg-neutral-base pt-md-extra pb-lg px-lg shadow-lg
                className
            )}*/
    >
        {/* We needed to add this wrapper so that absolute-positioned elements can be placed */}
        {/* inside the dialog. We noticed this while showing a loader inside the dialog. */}
        <div className={"relative gap-xl flex flex-col"}>{children}</div>
        {showCloseButton !== false && (
            <SheetPrimitive.Close asChild className="absolute right-4 top-4">
                <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
            </SheetPrimitive.Close>
        )}
    </SheetPrimitive.Content>
));

SheetContent.displayName = SheetPrimitive.Content.displayName;

export { SheetContent };
