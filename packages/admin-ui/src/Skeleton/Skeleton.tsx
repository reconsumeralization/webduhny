import React from "react";
import { cn, makeDecoratable } from "~/utils";

const DecoratableSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "wby-animate-pulse wby-rounded-md wby-bg-neutral-dimmed wby-size-full",
                className
            )}
            {...props}
        />
    );
};

const Skeleton = makeDecoratable("Skeleton", DecoratableSkeleton);

export { Skeleton };
