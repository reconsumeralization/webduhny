import React from "react";

export type TopAppBarActionItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
const TopAppBarActionItem = ({ children, ...props }: TopAppBarActionItemProps) => {
    return <div {...props}>{children}</div>;
};

export { TopAppBarActionItem };
