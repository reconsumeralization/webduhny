import React from "react";
import { ReactComponent as Add } from "@webiny/icons/add.svg";
import { i18n } from "@webiny/app/i18n";
import { useModel } from "~/admin/hooks";
import { Button, Tooltip } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/components/content-entries/header/buttons/create");

interface ButtonsCreateProps {
    onCreateEntry: (event: React.SyntheticEvent) => void;
    onCreateFolder: (event: React.SyntheticEvent) => void;
    canCreateFolder: boolean;
    canCreateContent: boolean;
}

export const ButtonsCreate = ({
    onCreateFolder,
    onCreateEntry,
    canCreateContent,
    canCreateFolder
}: ButtonsCreateProps) => {
    const { model } = useModel();

    let newFolderButton = (
        <Button
            data-testid="new-folder-button"
            onClick={onCreateFolder}
            disabled={!canCreateFolder}
            text={t`New Folder`}
            icon={<Add />}
            variant={"secondary"}
        />
    );

    if (!canCreateFolder) {
        newFolderButton = (
            <Tooltip
                content={`Cannot create folder because you're not an owner.`}
                trigger={newFolderButton}
            />
        );
    }

    let newEntryButton = (
        <Button
            data-testid="new-entry-button"
            onClick={onCreateEntry}
            disabled={!canCreateContent}
            text={`New ${model.name}`}
            icon={<Add />}
        />
    );

    if (!canCreateContent) {
        newEntryButton = (
            <Tooltip
                content={`Cannot create entry because you're not an owner.`}
                trigger={newEntryButton}
            />
        );
    }

    return (
        <>
            {newFolderButton}
            {newEntryButton}
        </>
    );
};
