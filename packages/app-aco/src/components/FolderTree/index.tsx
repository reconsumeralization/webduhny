import React, { useMemo } from "react";
import { Tooltip } from "@webiny/admin-ui";
import { useFolders } from "~/hooks/useFolders";
import { ButtonCreate } from "./ButtonCreate";
import { Empty } from "./Empty";
import { Loader } from "./Loader";
import { List } from "./List";
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
    const { folders, folderLevelPermissions: flp } = useFolders();
    const localFolders = useMemo(() => {
        if (!folders) {
            return [];
        }

        return folders.map(item =>
            item.id === ROOT_FOLDER && rootFolderLabel ? { ...item, title: rootFolderLabel } : item
        );
    }, [folders, rootFolderLabel]);

    const createButton = useMemo(() => {
        if (!enableCreate) {
            return null;
        }

        const canCreate = flp.canManageStructure(focusedFolderId!);
        const button = <ButtonCreate disabled={!canCreate} />;

        return canCreate ? (
            button
        ) : (
            <Tooltip
                content={`Cannot create folder because you're not an owner.`}
                trigger={button}
            />
        );
    }, [enableCreate, flp, focusedFolderId]);

    if (!folders) {
        return <Loader />;
    }

    return (
        <AcoWithConfig>
            {localFolders.length > 0 ? (
                <>
                    <List
                        folders={localFolders}
                        onFolderClick={onFolderClick}
                        focusedFolderId={focusedFolderId}
                        hiddenFolderIds={hiddenFolderIds}
                        enableActions={enableActions}
                    />
                    {enableCreate && <div className={"wby-mt-sm"}>{createButton}</div>}
                </>
            ) : (
                <>
                    <Empty />
                    {createButton}
                </>
            )}
        </AcoWithConfig>
    );
};
