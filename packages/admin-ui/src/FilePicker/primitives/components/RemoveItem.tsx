import React from "react";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { Icon } from "~/Icon";
import { IconButton, type IconButtonProps } from "~/Button";

interface RemoveItemProps extends IconButtonProps {
    onRemoveItem: () => void;
    small?: boolean;
}

const RemoveItem = ({ onRemoveItem, small, ...props }: RemoveItemProps) => {
    return (
        <IconButton
            {...props}
            icon={
                <Icon icon={<TrashIcon />} label={"Remove"} size={"md"} color={"neutral-light"} />
            }
            variant={"ghost"}
            size={small ? "xs" : "sm"}
            iconSize={small ? "default" : "lg"}
            onClick={onRemoveItem}
        />
    );
};

export { RemoveItem, type RemoveItemProps };
