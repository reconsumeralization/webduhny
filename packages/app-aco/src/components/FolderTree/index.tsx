import React, { useMemo } from "react";
import { Tooltip } from "@webiny/ui/Tooltip";
import { useGetFolderHierarchy, useGetFolderLevelPermission } from "~/features";
import { CreateButton } from "./ButtonCreate";
import { Loader } from "./Loader";
import { List } from "./List";
import { Container } from "./styled";
import { FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";
import { AcoWithConfig } from "~/config";

export { Loader };

export interface FolderTreeProps {
    onFolderClick: (data: FolderItem) => void;
    enableCreate?: boolean;
    rootFolderLabel?: string;
    enableActions?: boolean;
    focusedFolderId?: string;
    hiddenFolderIds?: string[];
}

export const FolderTree = ({
    focusedFolderId,
    hiddenFolderIds,
    enableActions,
    enableCreate,
    onFolderClick,
    rootFolderLabel
}: FolderTreeProps) => {
    const { folders, getIsFolderLoading } = useGetFolderHierarchy();
    const { getFolderLevelPermission: canManageStructure } =
        useGetFolderLevelPermission("canManageStructure");

    const localFolders = useMemo(() => {
        if (!folders) {
            return [];
        }

        return folders.reduce<FolderItem[]>((acc, item) => {
            if (item.id === ROOT_FOLDER && rootFolderLabel) {
                return [...acc, { ...item, title: rootFolderLabel }];
            }
            return [...acc, item];
        }, []);
    }, [folders]);

    const renderList = () => {
        if (getIsFolderLoading()) {
            return <Loader />;
        }

        let createButton = null;
        if (enableCreate) {
            const canCreate = canManageStructure(focusedFolderId!);

            createButton = <CreateButton disabled={!canCreate} />;

            if (!canCreate) {
                createButton = (
                    <Tooltip content={`Cannot create folder because you're not an owner.`}>
                        {createButton}
                    </Tooltip>
                );
            }
        }

        return (
            <AcoWithConfig>
                <List
                    folders={localFolders}
                    onFolderClick={onFolderClick}
                    focusedFolderId={focusedFolderId}
                    hiddenFolderIds={hiddenFolderIds}
                    enableActions={enableActions}
                />
                {enableCreate && createButton}
            </AcoWithConfig>
        );
    };
    return <Container>{renderList()}</Container>;
};
