import React from "react";
import { Button, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as SearchIcon } from "@webiny/icons/search.svg";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { i18n } from "@webiny/app/i18n";
import { useModel } from "~/admin/components/ModelProvider";

const t = i18n.ns("app-headless-cms/admin/components/content-entries/empty");

interface EmptyProps {
    isSearch: boolean;
    onCreateEntry: (event: React.SyntheticEvent) => void;
    onCreateFolder: (event: React.SyntheticEvent) => void;
    canCreateContent: boolean;
    canCreateFolder: boolean;
}

export const Empty = ({
    isSearch,
    onCreateEntry,
    onCreateFolder,
    canCreateContent,
    canCreateFolder
}: EmptyProps) => {
    const { model } = useModel();

    if (isSearch) {
        return <EmptyView icon={<SearchIcon />} title={t`No results found.`} action={null} />;
    }

    let createEntryButton = (
        <Button
            variant={"primary"}
            data-testid="new-entry-button"
            onClick={onCreateEntry}
            disabled={!canCreateContent}
            text={`New ${model.name}`}
            icon={<AddIcon />}
        />
    );

    if (!canCreateContent) {
        createEntryButton = (
            <Tooltip
                trigger={createEntryButton}
                content={`Cannot create entry because you're not an owner.`}
                side={"bottom"}
            />
        );
    }

    let createFolderButton = (
        <Button
            variant={"secondary"}
            data-testid="new-folder-button"
            onClick={onCreateFolder}
            disabled={!canCreateFolder}
            text={`New folder`}
            icon={<AddIcon />}
        />
    );

    if (!canCreateFolder) {
        createFolderButton = (
            <Tooltip
                trigger={createFolderButton}
                content={`Cannot create folder because you're not an owner.`}
                side={"bottom"}
            />
        );
    }

    return (
        <EmptyView
            title={t`Nothing to show here, {message} `({
                message: canCreateContent
                    ? "navigate to a different folder or create a..."
                    : "click on the left side to navigate to a different folder."
            })}
            action={
                <>
                    {createFolderButton}
                    {createEntryButton}
                </>
            }
        />
    );
};
