import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export interface DialogContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    preventOutsideDismiss?: boolean;
}

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
>(({ className, children, ...props }, ref) => {
    let preventOutsideDismissProps: Pick<
        DialogPrimitive.DialogContentProps,
        "onInteractOutside" | "onEscapeKeyDown"
    > = {};
    if (props.preventOutsideDismiss) {
        preventOutsideDismissProps = {
            onInteractOutside: event => event.preventDefault(),
            onEscapeKeyDown: event => event.preventDefault()
        };
    }

    return (
        <DialogPrimitive.Content
            {...preventOutsideDismissProps}
            {...props}
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg border bg-neutral-base shadow-lg focus-visible:outline-none rounded-xl text-md text-neutral-strong",
                "translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                className
            )}
        >
            <div className={"flex flex-col"}>{children}</div>
        </DialogPrimitive.Content>
    );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };
