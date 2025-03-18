import React from "react";
import { ReactComponent as ReplaceIcon } from "@material-design-icons/svg/outlined/file_upload.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";
import { cn } from "~/utils";

interface ItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    onRemoveItem?: () => void;
    onEditItem?: () => void;
    onReplaceItem?: () => void;
    disabled?: boolean;
    small?: boolean;
}

const ItemActions = ({
    disabled,
    onRemoveItem,
    onEditItem,
    onReplaceItem,
    small,
    className,
    ...props
}: ItemActionsProps) => {
    const iconSize = small ? "default" : "lg";
    const buttonSize = small ? "xs" : "sm";

    return (
        <div
            {...props}
            className={cn("wby-flex wby-justify-center wby-items-center wby-gap-xs", className)}
        >
            {small && onReplaceItem && (
                <IconButton
                    icon={
                        <Icon
                            icon={<ReplaceIcon />}
                            label={"Replace"}
                            size={"md"}
                            color={"neutral-light"}
                            disabled={disabled}
                        />
                    }
                    variant={"ghost"}
                    size={buttonSize}
                    iconSize={iconSize}
                    onClick={onReplaceItem}
                    disabled={disabled}
                />
            )}

            {onEditItem && (
                <IconButton
                    icon={
                        <Icon
                            icon={<EditIcon />}
                            label={"Edit"}
                            size={"md"}
                            color={"neutral-light"}
                            disabled={disabled}
                        />
                    }
                    variant={"ghost"}
                    size={buttonSize}
                    iconSize={iconSize}
                    onClick={onEditItem}
                    disabled={disabled}
                />
            )}

            {onRemoveItem && (
                <IconButton
                    icon={
                        <Icon
                            icon={<TrashIcon />}
                            label={"Remove"}
                            size={"md"}
                            color={"neutral-light"}
                            disabled={disabled}
                        />
                    }
                    variant={"ghost"}
                    size={buttonSize}
                    iconSize={iconSize}
                    onClick={onRemoveItem}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export { ItemActions, type ItemActionsProps };
