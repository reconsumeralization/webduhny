import React from "react";
import { Icon, type IconProps } from "@webiny/admin-ui";

interface TreeItemIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
    active?: boolean;
}

const TreeItemIcon = ({ element, active, ...props }: TreeItemIconProps) => {
    return (
        <Icon
            icon={element}
            size={"sm"}
            color={active ? "neutral-strong" : "neutral-light"}
            {...props}
        />
    );
};

export { TreeItemIcon, type TreeItemIconProps };
