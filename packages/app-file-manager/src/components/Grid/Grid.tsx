import React, { useMemo } from "react";
import { cn, OverlayLoader } from "@webiny/admin-ui";
import { FolderGridItem, FolderProvider } from "@webiny/app-aco";
import { i18n } from "@webiny/app/i18n";
import { FolderItem } from "@webiny/app-aco/types";
import { FileItem } from "@webiny/app-admin/types";
import { FileProvider } from "~/contexts/FileProvider";
import { Thumbnail } from "../Thumbnail";
import { File } from "./File";

const t = i18n.ns("app-admin/file-manager/components/grid");

interface GridProps {
    records: FileItem[];
    folders: FolderItem[];
    loading?: boolean;
    onFolderClick: (id: string) => void;
    selected: FileItem[];
    multiple?: boolean;
    toggleSelected: (file: FileItem) => void;
    deselectAll: () => void;
    onChange?: (file: FileItem) => void;
    onClose?: () => void;
    hasOnSelectCallback: boolean;
    displaySubFolders?: boolean;
}

export const Grid = ({
    folders,
    records,
    loading,
    onFolderClick,
    selected,
    onChange,
    onClose,
    toggleSelected,
    deselectAll,
    multiple,
    hasOnSelectCallback,
    displaySubFolders = true
}: GridProps) => {
    if (loading) {
        return (
            <div className={"wby-relative wby-size-full"}>
                <OverlayLoader text={t`Loading files...`} size={"lg"} />
            </div>
        );
    }

    const onSelect = useMemo(() => {
        if (!onChange) {
            return undefined;
        }

        return (record: FileItem) => (event?: React.MouseEvent) => {
            if (event) {
                event.stopPropagation();
            }

            if (!hasOnSelectCallback || multiple) {
                toggleSelected(record);
                return;
            }

            onChange(record);
            onClose && onClose();
        };
    }, [onChange]);

    return (
        <div
            className={cn(["wby-p-lg", "wby-grid wby-gap-md wby-grid"])}
            style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
            }}
            onClick={deselectAll}
        >
            <>
                {displaySubFolders &&
                    folders.map(folder => (
                        <FolderProvider folder={folder} key={folder.id}>
                            <FolderGridItem onClick={onFolderClick} />
                        </FolderProvider>
                    ))}
                {records.map(record => (
                    <FileProvider file={record} key={record.id}>
                        <File
                            file={record}
                            multiple={Boolean(multiple)}
                            selected={selected.some(current => current.id === record.id)}
                            onSelect={onSelect ? onSelect(record) : undefined}
                        >
                            <Thumbnail />
                        </File>
                    </FileProvider>
                ))}
            </>
        </div>
    );
};
