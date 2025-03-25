import * as React from "react";
import { ReactComponent as DragHandleIcon } from "@webiny/icons/drag_indicator.svg";
import { makeDecoratable } from "~/utils";
import { Icon, IconProps as IconProps } from "~/Icon";

interface ListItemHandleProps extends Omit<IconProps, "icon" | "label"> {
    icon?: React.ReactElement;
    label?: string;
}

const DecoratableListItemHandle = (props: ListItemHandleProps) => {
    return (
        <Icon
            size={"md"}
            color={"neutral-light"}
            className={"wby-mx-xxs wby-cursor-grab"}
            icon={<DragHandleIcon />}
            label={"Drag handle"}
            {...props}
        />
    );
};

const ListItemHandle = makeDecoratable("ListItemHandle", DecoratableListItemHandle);

export { ListItemHandle, type ListItemHandleProps };
