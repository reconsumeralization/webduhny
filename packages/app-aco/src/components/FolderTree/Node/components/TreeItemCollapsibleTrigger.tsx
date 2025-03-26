import React from "react";
import { ReactComponent as ChevronRight } from "@webiny/icons/chevron_right.svg";
import { cn, IconButton, Icon, type IconButtonProps } from "@webiny/admin-ui";

interface TreeItemCollapsibleTriggerProps extends IconButtonProps {
    open?: boolean;
}

const TreeItemCollapsibleTrigger = ({ open, ...props }: TreeItemCollapsibleTriggerProps) => {
    return (
        <IconButton
            {...props}
            size={"xs"}
            variant={"ghost"}
            icon={
                <Icon
                    icon={<ChevronRight />}
                    size="sm"
                    label={"Open / Close tree item"}
                    color={"neutral-strong"}
                    className={cn(
                        "wby-transition wby-transform wby-duration-100 wby-ease-linear",
                        open ? "wby-rotate-90" : "wby-rotate-0"
                    )}
                />
            }
        />
    );
};

export { TreeItemCollapsibleTrigger, type TreeItemCollapsibleTriggerProps };
