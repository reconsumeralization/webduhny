import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { cn } from "~/utils";
import { IconButton } from "~/Button";

export interface DialogContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    showCloseButton?: boolean;
}

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
>(({ className, children, showCloseButton, ...props }, ref) => (
    <DialogPrimitive.Content
        ref={ref}
        {...props}
        className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-neutral-base pt-md-extra pb-lg px-lg shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl text-md text-neutral-strong",
            className
        )}
    >
        {/* We needed to add this wrapper so that absolute-positioned elements can be placed */}
        {/* inside the dialog. We noticed this while showing a loader inside the dialog. */}
        <div className={"relative gap-xl flex flex-col"}>{children}</div>

        {showCloseButton !== false && (
            <DialogPrimitive.Close asChild className="absolute right-4 top-4">
                <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
            </DialogPrimitive.Close>
        )}
    </DialogPrimitive.Content>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };
