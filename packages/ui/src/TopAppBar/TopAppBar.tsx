import React from "react";
import { HeaderBar } from "@webiny/admin-ui";
import { TopAppBarProps as RmwcTopAppBarProps } from "@rmwc/top-app-bar";

export type TopAppBarProps = RmwcTopAppBarProps & {
    /**
     * Element children
     */
    children: React.ReactNode[] | React.ReactNode;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * Style object
     */
    style?: React.CSSProperties;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `HeaderBar` component from the `@webiny/admin-ui` package instead.
 */
const TopAppBar = (props: TopAppBarProps) => {
    const { children, ...rest } = props;

    let start, middle, end;
    React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.props.alignStart) {
            start = child;
        } else if (child.props.alignEnd) {
            end = child;
        } else {
            middle = child;
        }
    });
    return <HeaderBar start={start} middle={middle} end={end} {...rest} />;
};

export { TopAppBar };
