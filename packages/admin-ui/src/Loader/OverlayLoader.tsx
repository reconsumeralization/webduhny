import React from "react";
import { Loader, LoaderProps } from "./Loader";
import { cn, makeDecoratable } from "~/utils";

interface OverlayLoaderProps extends LoaderProps {}

const DecoratableOverlayLoader = ({ className, size = "lg", ...props }: OverlayLoaderProps) => {
    return (
        <div
            className={cn(
                "wby-w-full wby-h-full wby-absolute wby-inset-0 wby-bg-neutral-base/80 wby-flex wby-items-center wby-justify-center wby-z-30",
                className
            )}
        >
            <Loader {...props} size={size} />
        </div>
    );
};

const OverlayLoader = makeDecoratable("OverlayLoader", DecoratableOverlayLoader);

export { OverlayLoader, type OverlayLoaderProps };
