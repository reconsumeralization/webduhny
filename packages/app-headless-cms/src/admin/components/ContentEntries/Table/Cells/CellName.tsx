import React from "react";

import { Icon, Link, Text } from "@webiny/admin-ui";
import { ReactComponent as Folder } from "@webiny/icons/folder.svg";
import { ReactComponent as FolderShared } from "@webiny/icons/folder_shared.svg";
import { ReactComponent as File } from "@webiny/icons/description.svg";
import { useNavigateFolder } from "@webiny/app-aco";

import { ContentEntryListConfig } from "~/admin/config/contentEntries";
import { useContentEntriesList } from "~/admin/views/contentEntries/hooks";
import { usePermission } from "~/admin/hooks";

import { FolderTableItem } from "@webiny/app-aco/types";
import { EntryTableItem } from "~/types";

interface FolderCellNameProps {
    folder: FolderTableItem;
}

export const FolderCellName = ({ folder }: FolderCellNameProps) => {
    const { navigateToFolder } = useNavigateFolder();

    let icon = <Folder />;
    if (folder.hasNonInheritedPermissions && folder.canManagePermissions) {
        icon = <FolderShared />;
    }

    return (
        <div
            className={
                "wby-flex wby-items-center wby-gap-sm wby-truncate wby-cursor-pointer wby-font-semibold hover:wby-underline"
            }
            onClick={() => navigateToFolder(folder.id)}
        >
            <Icon
                size={"sm"}
                color={"neutral-strong"}
                icon={icon}
                label={`Folder - ${folder.title}`}
            />
            <Text className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>{folder.title}</Text>
        </div>
    );
};

interface EntryCellRowTitleProps {
    entry: EntryTableItem;
}

const EntryCellRowTitle = ({ entry }: EntryCellRowTitleProps) => {
    return (
        <div className={"wby-flex wby-items-center wby-gap-sm wby-truncate"}>
            <Icon
                size={"sm"}
                color={"neutral-strong"}
                icon={<File />}
                label={`Entry - ${entry.meta.title}`}
            />
            <Text className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>{entry.meta.title}</Text>
        </div>
    );
};

interface EntryCellNameProps {
    entry: EntryTableItem;
}

export const EntryCellName = ({ entry }: EntryCellNameProps) => {
    const { getEntryEditUrl } = useContentEntriesList();
    const { canEdit } = usePermission();

    const entryEditUrl = getEntryEditUrl(entry);

    if (!canEdit(entry, "cms.contentEntry")) {
        return <EntryCellRowTitle entry={entry} />;
    }

    return (
        <Link to={entryEditUrl} variant={"secondary"} className={"wby-truncate"}>
            <EntryCellRowTitle entry={entry} />
        </Link>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = ContentEntryListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row} />;
    }

    return <EntryCellName entry={row} />;
};
