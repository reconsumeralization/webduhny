import React from "react";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";
import { SimpleFormHeader } from "@webiny/app-admin/components/SimpleForm";
import { IconButton } from "@webiny/ui/Button";

interface HeaderProps {
    onClose: () => void;
}

export const Header = ({ onClose }: HeaderProps) => {
    return (
        <SimpleFormHeader title={"Entry revisions"}>
            <IconButton icon={<CloseIcon />} onClick={onClose} />
        </SimpleFormHeader>
    );
};
