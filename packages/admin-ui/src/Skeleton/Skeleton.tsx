import React from "react";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const skeletonVariants = cva("wby-animate-skeletonPulse wby-rounded-sm", {
    variants: {
        type: {
            text: "wby-w-full",
            thumbnail: "wby-aspect-square",
            area: "wby-size-full"
        },
        size: {
            xs: "wby-h-[8px]",
            sm: "wby-h-[12px]",
            md: "wby-h-[16px]",
            lg: "wby-h-[24px]",
            xl: "wby-h-[32px]",
            xxl: "wby-h-[40px]",
            "3xl": "wby-h-[48px]"
        }
    },
    compoundVariants: [
        // The following compound variants are not supported by the current version of the design system.
        {
            type: "thumbnail",
            size: "xs",
            class: "!wby-hidden"
        },
        {
            type: "text",
            size: "3xl",
            class: "!wby-hidden"
        }
    ],
    defaultVariants: {
        type: "area",
        size: "md"
    }
});

interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof skeletonVariants> {}

const DecoratableSkeleton = ({ size, type, className, ...props }: SkeletonProps) => {
    return <div className={cn(skeletonVariants({ size, type }), className)} {...props} />;
};

const Skeleton = makeDecoratable("Skeleton", DecoratableSkeleton);

export { Skeleton, type SkeletonProps };
