import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { cn, cva, VariantProps } from "~/utils";
import { IconButton } from "~/Button";

export interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {
    showCloseButton?: boolean;
}

const sheetVariants = cva(
    "fixed z-50 gap-4 bg-neutral-base pt-md-extra pb-lg px-lg shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 text-md text-neutral-strong",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
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
>(({ side = "right", className, children, showCloseButton, ...props }, ref) => (
    <SheetPrimitive.Content
        ref={ref}
        {...props}
        className={cn(sheetVariants({ side }), className)}
        /*    className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-neutral-base pt-md-extra pb-lg px-lg shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl ",
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
