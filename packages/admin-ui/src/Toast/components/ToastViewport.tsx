import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "~/utils";

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "wby-fixed wby-top-0 wby-right-0 wby-bottom-auto wby-z-[100] wby-flex wby-max-h-screen wby-flex-col wby-p-[30px]",
            className
        )}
        {...props}
    />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export { ToastViewport };
