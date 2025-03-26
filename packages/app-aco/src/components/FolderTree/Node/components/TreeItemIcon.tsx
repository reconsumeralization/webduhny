import React from "react";
import { Icon, type IconProps } from "@webiny/admin-ui";

interface TreeItemIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
}

const TreeItemIcon = ({ element, ...props }: TreeItemIconProps) => {
    return <Icon icon={element} size={"sm"} color={"neutral-light"} {...props} />;
};

export { TreeItemIcon, type TreeItemIconProps };
