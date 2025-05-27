import React from "react";

export type TopAppBarNavigationIconProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
const TopAppBarNavigationIcon = ({ children, ...props }: TopAppBarNavigationIconProps) => {
    return <div {...props}>{children}</div>;
};

export { TopAppBarNavigationIcon };
