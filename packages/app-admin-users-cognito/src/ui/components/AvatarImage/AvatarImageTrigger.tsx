import React from "react";
import { ReactComponent as ImageIcon } from "@material-design-icons/svg/outlined/image.svg";
import { cn, Icon, IconButton, Tooltip } from "@webiny/admin-ui";

interface AvatarImageTriggerProps {
    onSelectItem: () => void;
    disabled?: boolean;
}

const AvatarImageTrigger = ({ onSelectItem, disabled }: AvatarImageTriggerProps) => {
    return (
        <div
            data-role={"select-image"}
            className={cn([
                "wby-size-[128px]",
                "wby-flex wby-justify-center wby-items-center wby-gap-xs",
                "wby-bg-neutral-strong"
            ])}
        >
            <Tooltip
                content={"Select from library"}
                trigger={
                    <IconButton
                        icon={
                            <Icon
                                icon={<ImageIcon />}
                                label={"Select from library"}
                                size={"lg"}
                                color={"neutral"}
                                disabled={disabled}
                            />
                        }
                        variant={"ghost-negative"}
                        size={"lg"}
                        onClick={onSelectItem}
                        disabled={disabled}
                    />
                }
            />
        </div>
    );
};

export { AvatarImageTrigger };
