import React from "react";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/upload.svg";
import { Icon } from "~/Icon";
import { IconButton } from "~/Button";

interface SelectItemProps {
    onSelectItem: () => void;
    small?: boolean;
}

const SelectItem = ({ onSelectItem, small }: SelectItemProps) => {
    return (
        <IconButton
            icon={<Icon icon={<EditIcon />} label={"Edit"} size={"md"} color={"neutral-light"} />}
            variant={"ghost"}
            size={small ? "xs" : "sm"}
            iconSize={small ? "default" : "lg"}
            onClick={onSelectItem}
        />
    );
};

export { SelectItem, type SelectItemProps };
