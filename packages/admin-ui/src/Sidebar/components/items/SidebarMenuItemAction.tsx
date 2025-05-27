import React from "react";
import { IconButton, type IconButtonProps } from "~/Button/IconButton";

interface SidebarMenuItemActionProps extends Omit<IconButtonProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarMenuItemAction = ({ element, ...props }: SidebarMenuItemActionProps) => {
    return (
        <IconButton
            icon={element}
            size={"xs"}
            variant={"ghost"}
            className={"wby-ml-auto group-data-[state=collapsed]:wby-hidden"}
            {...props}
        />
    );
};

export { SidebarMenuItemAction, type SidebarMenuItemActionProps };
