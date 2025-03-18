import React from "react";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/file_upload.svg";
import { Icon } from "~/Icon";
import { IconButton, type IconButtonProps } from "~/Button";

interface SelectItemProps extends IconButtonProps {
    onSelectItem: () => void;
    small?: boolean;
}

const SelectItem = ({ disabled, onSelectItem, small }: SelectItemProps) => {
    return (
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
            size={small ? "xs" : "sm"}
            iconSize={small ? "default" : "lg"}
            onClick={onSelectItem}
            disabled={disabled}
        />
    );
};

export { SelectItem, type SelectItemProps };
