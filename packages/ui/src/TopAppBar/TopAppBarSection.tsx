import React from "react";
import { TopAppBarSectionProps as RmwcTopAppBarSectionProps } from "@rmwc/top-app-bar";

export type TopAppBarSectionProps = RmwcTopAppBarSectionProps & {
    /**
     * Element children
     */
    children: React.ReactNode[] | React.ReactNode;

    /**
     * Style object.
     */
    style?: React.CSSProperties;

    /**
     * CSS class name.
     */
    className?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `HeaderBar` component from the `@webiny/admin-ui` package instead.
 */
const TopAppBarSection = (props: TopAppBarSectionProps) => {
    return <>{props.children}</>;
};

export { TopAppBarSection };
