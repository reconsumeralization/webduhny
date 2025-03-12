import * as React from "react";
import { makeDecoratable } from "~/utils";
import { Icon as IconComponent, IconProps as IconComponentProps } from "~/Icon";

type ListItemIconProps = IconComponentProps;

const DecoratableListItemIcon = (props: ListItemIconProps) => {
    return <IconComponent size={"md"} color={"inherit"} {...props} />;
};

export const ListItemIcon = makeDecoratable("ListItemIcon", DecoratableListItemIcon);
