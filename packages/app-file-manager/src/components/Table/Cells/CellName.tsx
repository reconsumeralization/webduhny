import React from "react";

import { FolderIcon, FolderSharedIcon } from "@webiny/app-aco";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";
import { FileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig";
import { FileTableItem } from "~/types";
import { FolderTableItem } from "@webiny/app-aco/types";
import { cn, Text } from "@webiny/admin-ui";
import { Thumbnail } from "~/components/Thumbnail";
import { FileProvider } from "~/contexts/FileProvider";

interface DefaultProps {
    onClick: (id: string) => void;
}

interface FolderCellNameProps extends DefaultProps {
    folder: FolderTableItem;
}

export const FolderCellName = ({ folder, onClick }: FolderCellNameProps) => {
    let icon = <FolderIcon width={32} height={32} />;
    if (folder.hasNonInheritedPermissions && folder.canManagePermissions) {
        icon = <FolderSharedIcon width={32} height={32} />;
    }

    return (
        <div
            className={cn([
                "wby-flex wby-items-center wby-gap-md",
                "wby-truncate wby-cursor-pointer wby-font-semibold",
                "hover:wby-underline"
            ])}
            onClick={() => onClick(folder.id)}
        >
            <div className={"wby-size-xl wby-rounded-md wby-overflow-hidden wby-flex-shrink-0"}>
                {icon}
            </div>
            <Text className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>{folder.title}</Text>
        </div>
    );
};

interface FileCellNameProps extends DefaultProps {
    file: FileTableItem;
}

export const FileCellName = ({ file, onClick }: FileCellNameProps) => {
    return (
        <div
            className={cn([
                "wby-flex wby-items-center wby-gap-md",
                "wby-truncate wby-cursor-pointer",
                "hover:wby-underline"
            ])}
            onClick={() => onClick(file.id)}
        >
            <FileProvider file={file}>
                <div className={"wby-size-xl wby-rounded-md wby-overflow-hidden wby-flex-shrink-0"}>
                    <div
                        className={cn([
                            "wby-w-full wby-bg-neutral-muted",
                            "wby-flex wby-items-center wby-justify-center",
                            "[&>*]:wby-aspect-square [&>*]:wby-w-full [&>*]:wby-h-full [&>img]:wby-object-cover"
                        ])}
                    >
                        <Thumbnail />
                    </div>
                </div>
            </FileProvider>
            <Text className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>{file.name}</Text>
        </div>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = FileManagerViewConfig.Browser.Table.Column;
    const { row } = useTableRow();
    const { showFileDetails, setFolderId } = useFileManagerView();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row} onClick={setFolderId} />;
    }

    return <FileCellName file={row} onClick={showFileDetails} />;
};
