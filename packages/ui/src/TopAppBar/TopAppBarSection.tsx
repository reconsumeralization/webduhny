import React from "react";

export interface RmwcTopAppBarSectionProps {
    /** Aligns the section to the start. */
    alignStart?: boolean;
    /** Aligns the section to the end. */
    alignEnd?: boolean;
}

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
