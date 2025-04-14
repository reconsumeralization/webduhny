import React from "react";
import { Icon, type IconProps } from "~/Icon";

interface DropdownMenuItemIconProps extends Omit<IconProps, "icon"> {
    element: React.ReactNode;
}

const DropdownMenuItemIcon = (props: DropdownMenuItemIconProps) => {
    return <Icon size={"sm"} color={"neutral-light"} icon={props.element} {...props} />;
};

export { DropdownMenuItemIcon, type DropdownMenuItemIconProps };
