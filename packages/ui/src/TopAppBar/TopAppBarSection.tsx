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

const TopAppBarSection = (props: TopAppBarSectionProps) => {
    return <>{props.children}</>;
};

export { TopAppBarSection };
