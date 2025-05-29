import React from "react";
import { ReactComponent as ChevronRight } from "@webiny/icons/chevron_right.svg";
import { cn, IconButton, Icon, type IconButtonProps, Loader } from "@webiny/admin-ui";

interface TreeItemCollapsibleTriggerProps extends IconButtonProps {
    open?: boolean;
    loading?: boolean;
}

const TreeItemCollapsibleTrigger = ({
    open,
    loading,
    ...props
}: TreeItemCollapsibleTriggerProps) => {
    if (loading) {
        return <Loader size={"xs"} variant={"subtle"} />;
    }

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
