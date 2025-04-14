import React, { CSSProperties, PropsWithChildren } from "react";
import { Skeleton as AdminSkeleton, SkeletonProps as AdminSkeletonProps } from "@webiny/admin-ui";

export interface SkeletonProps extends AdminSkeletonProps {
    //SkeletonStyleProps from "react-loading-skeleton"
    baseColor?: string;
    highlightColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    inline?: boolean;
    duration?: number;
    direction?: "ltr" | "rtl";
    enableAnimation?: boolean;
    // SkeletonProps from "react-loading-skeleton"
    count?: number;
    wrapper?: React.FunctionComponent<PropsWithChildren<unknown>>;
    className?: string;
    containerClassName?: string;
    containerTestId?: string;
    circle?: boolean;
    style?: CSSProperties;
    // Custom props
    theme?: "dark" | "light";
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Skeleton` component from the `@webiny/admin-ui` package instead.
 */
export const Skeleton = ({ className, type, size }: SkeletonProps) => {
    return <AdminSkeleton className={className} type={type} size={size} />;
};
