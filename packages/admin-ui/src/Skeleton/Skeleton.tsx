import React from "react";
import { cn, makeDecoratable } from "~/utils";

const DecoratableSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-neutral-dimmed size-full", className)}
            {...props}
        />
    );
};

const Skeleton = makeDecoratable("Skeleton", DecoratableSkeleton);

export { Skeleton };
