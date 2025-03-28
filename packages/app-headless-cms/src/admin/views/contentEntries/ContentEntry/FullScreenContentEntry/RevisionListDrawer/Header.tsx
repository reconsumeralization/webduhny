import React from "react";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";
import { SimpleFormHeader } from "@webiny/app-admin/components/SimpleForm";
import { CloseButton } from "./RevisionListDrawer.styled";

interface HeaderProps {
    onClose: () => void;
}

export const Header = ({ onClose }: HeaderProps) => {
    return (
        <SimpleFormHeader title={"Entry revisions"}>
            <CloseButton icon={<CloseIcon />} onClick={onClose} />
        </SimpleFormHeader>
    );
};
