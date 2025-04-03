import React, { useMemo } from "react";
import { Tooltip } from "@webiny/admin-ui";
import { useGetFolderLevelPermission, useListFolders } from "~/features";
import { ButtonCreate } from "./ButtonCreate";
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
    const { folders } = useListFolders();
    const { getFolderLevelPermission: canManageStructure } =
        useGetFolderLevelPermission("canManageStructure");

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

        const canCreate = canManageStructure(focusedFolderId!);
        const button = <ButtonCreate disabled={!canCreate} />;

        return canCreate ? (
            button
        ) : (
            <Tooltip
                content={`Cannot create folder because you're not an owner.`}
                trigger={button}
            />
        );
    }, [enableCreate, canManageStructure, focusedFolderId, localFolders]);

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
                    {enableCreate && (
                        <div className={"wby-mt-sm-plus wby-ml-xs"}>{createButton}</div>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </AcoWithConfig>
    );
};
